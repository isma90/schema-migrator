import { IConnection } from '../interface';
import { Connection } from 'typeorm';
import { Database, logger } from '../common';

export class MigrationService {
  private readonly from: IConnection;
  private readonly to: IConnection;
  private fromConnection: Connection;
  private toConnection: Connection;

  constructor(from: IConnection, to: IConnection) {
    this.from = from;
    this.to = to;
  }

  public async migrate() {
    try {
      if (!this.from.databases || this.from.databases.length <= 0) {
        return;
      }
      for (const database of this.from.databases) {
        this.fromConnection = Database.getConnection(this.from, database);
        this.toConnection = Database.getConnection(this.to, database);
        await this.fromConnection.connect();
        await this.toConnection.connect();
        const tables = (await this.fromConnection.query(`SHOW TABLES;`)).map((v: any) => {
          return {
            name: v[`Tables_in_${database}`],
            script: '',
            migrated: false
          }
        });
        await this.cloneTables(tables);
        await this.fromConnection.close();
        await this.toConnection.close();
      }
    } catch (e: any) {
      logger.error(e.stack);
    }
  }

  private async cloneTables(tables: any[]) {
    logger.debug(tables);
    for (let table of tables) {
      logger.debug(table);
      table.script = (await this.fromConnection.query(`SHOW CREATE TABLE ${table.name};`))[0]['Create Table'];
    }
    for (let table of tables) {
      await this.clone(table, tables);
    }
  }

  private async clone(table: { name: string, script: string, migrated: boolean }, tables: { name: string, script: string, migrated: boolean }[]) {
    try {
      await this.toConnection.query(table.script);
      table.migrated = true;
    } catch (e: any) {
      if (e.code === 'ER_FK_CANNOT_OPEN_PARENT') {
        const dependency = e.message.match(/\'[a-z]+\'/g)[0].replace(/\'/g, '');
        logger.info(`${table.name} need parent Table ${dependency}`);
        const dependencyTable = tables.find(v => v.name === dependency);
        if (!dependencyTable) {
          throw 'Parent Table not Found';
        }
        logger.info(`Creating ${dependency} parent table`);
        await this.clone(dependencyTable, tables);
        logger.info(`Parent table ${dependency} created`);
        logger.info(`Retrying ${table.name}`);
        await this.clone(table, tables);
      }
    }
  }
}
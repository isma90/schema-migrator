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
    if (!this.from.databases || this.from.databases.length <= 0) {
      return;
    }
    for (const database of this.from.databases) {
      this.fromConnection = Database.getConnection(this.from, database);
      this.toConnection = Database.getConnection(this.to, database);
      await this.fromConnection.connect();
      await this.toConnection.connect();
      const tables = await this.fromConnection.query(`SHOW TABLES;`);
      await MigrationService.cloneTables(tables);
      await this.fromConnection.close();
      await this.toConnection.close();
    }
  }

  private static async cloneTables(tables: any[]) {
    logger.debug(tables);
  }
}
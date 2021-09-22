import { ConnectionManager } from 'typeorm';
import { IConnection } from '../interface';
import { env } from 'process';

export class Database {
  public static getConnection(connection: IConnection, database: string){
    return new ConnectionManager().create({
      type: 'mysql',
      host: connection.host,
      port: connection.port,
      username: connection.user,
      password: connection.pass,
      database,
      logging: env.LOG_LEVEL === 'debug'? ['query', 'schema', 'error', 'warn', 'info', 'log'] : [],
      synchronize: false,
    });
  }
}
import { ConnectionManager } from 'typeorm';
import { IConnection } from '../interface';

export class Database {
  public static getConnection(connection: IConnection, database: string){
    return new ConnectionManager().create({
      type: 'mysql',
      host: connection.host,
      port: connection.port,
      username: connection.user,
      password: connection.pass,
      database,
      logging: ['query', 'schema', 'info', 'warn', 'error'],
      synchronize: false,
    });
  }
}
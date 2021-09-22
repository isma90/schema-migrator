import { env } from 'process';
import { Utils } from './utils';

export const config = {
  database: {
    from: {
      host: env.FROM_HOST || '',
      port: Utils.parse(3306, env.FROM_PORT),
      user: env.FROM_USER || '',
      pass: env.FROM_PASS || '',
      databases: env.FROM_DB?.split(','),
    },
    to: {
      host: env.TO_HOST || '',
      port: Utils.parse(3306, env.TO_PORT),
      user: env.TO_USER || '',
      pass: env.TO_PASS || '',
    }
  }
}
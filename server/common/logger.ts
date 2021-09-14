import winston from 'winston';
import { Utils } from './utils';
import { env } from 'process';

const regexBreakLine = new RegExp(/(\r\n|\n|\r)/gm);
const myFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  return `{ "time": "${timestamp}", "env":"${env.regexBreakLine}", "level":"${level}", "payload":"${Utils.simpleStringify({
    message,
    metadata
  }).replace(regexBreakLine, ' ')}"}`;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.prettyPrint(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});
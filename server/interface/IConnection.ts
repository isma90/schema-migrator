export class IConnection {
  host: string;
  port: number;
  user: string;
  pass: string;
  databases?: string[];
}
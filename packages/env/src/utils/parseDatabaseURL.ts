import { parse } from 'url';

export type ParsedDatabaseURL = {
  adapter?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
};

export const parseDatabaseURL = (databaseURL: string): ParsedDatabaseURL => {
  const parsedURL = parse(databaseURL, true);

  let user: string | undefined = undefined;
  let password: string | undefined = undefined;
  let port: number | undefined = undefined;

  if (parsedURL.auth) {
    var auth = parsedURL.auth.split(':');
    user = auth[0];
    password = auth[1];
  }

  const adapter = parsedURL.protocol?.replace(':', '');
  let database = parsedURL.pathname ?? undefined;

  // Trim leading slash for non-sqlite3 databases
  if (adapter !== 'sqlite3' && database) {
    database = database.substring(1);
  }

  if (parsedURL.port) {
    const parsedPort = parseInt(parsedURL.port);

    if (!isNaN(parsedPort)) {
      port = parsedPort;
    }
  }

  return {
    adapter,
    database,
    host: parsedURL.host ?? undefined,
    port,
    user,
    password,
  };
};

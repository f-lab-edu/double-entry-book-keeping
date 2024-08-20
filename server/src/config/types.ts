export interface DatabaseConfig {
  url: string;
}

export interface JwtCookieConfig {
  maxAge: number;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  cookie: JwtCookieConfig;
}

export interface ClientConfig {
  host: string;
}

export type Environment = 'development' | "local" | 'production';

export interface ConfigSchema {
  environment: Environment;
  database: DatabaseConfig;
  jwt: JwtConfig;
  client: ClientConfig;
}

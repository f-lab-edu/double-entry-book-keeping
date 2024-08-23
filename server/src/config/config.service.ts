import { ConfigService as NestConfigService } from '@nestjs/config';
import {
  ClientConfig,
  ConfigSchema,
  DatabaseConfig,
  Environment,
  JwtConfig,
} from './types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(
    private readonly nestConfigService: NestConfigService<ConfigSchema>,
  ) {}

  getEnvironment(): Environment {
    return this.nestConfigService.get<Environment>('environment');
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.nestConfigService.get<DatabaseConfig>('database');
  }

  getJwtConfig(): JwtConfig {
    return this.nestConfigService.get<JwtConfig>('jwt');
  }

  getClientConfig(): ClientConfig {
    return this.nestConfigService.get<ClientConfig>('client');
  }
}

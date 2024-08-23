import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { ConfigService } from './config.service';
import { ConfigSchema } from './types';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        (): ConfigSchema => {
          switch (process.env.NODE_ENV) {
            case 'development': {
              const yamlFilePath = '/run/secrets/config.yaml';
              const fileContent = readFileSync(yamlFilePath, 'utf8');
              const config = yaml.load(fileContent) as ConfigSchema;

              // prisma는 환경 변수로만 데이터베이스 url을 받을 수 있음
              process.env.DATABASE_URL = config.database.url;

              return config;
            }
            case 'local': {
              const configPath = '/etc/config/config.yaml';
              const secretPath = '/etc/secret/secret.yaml';
              const configContent = readFileSync(configPath, 'utf8');
              const secretContent = readFileSync(secretPath, 'utf8');
              const configObject = yaml.load(configContent) as object;
              const secretObject = yaml.load(secretContent) as object;

              const mergedConfig = {
                ...configObject,
                ...secretObject,
              } as ConfigSchema;

              process.env.DATABASE_URL = mergedConfig.database.url;

              return mergedConfig;
            }
            default:
              throw new Error(
                `${process.env.NODE_ENV}는 정의되지 않은 환경입니다.`,
              );
          }
        },
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

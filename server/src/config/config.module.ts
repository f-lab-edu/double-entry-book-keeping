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
          const yamlFilePath = '/run/secrets/config.yaml';
          const fileContent = readFileSync(yamlFilePath, 'utf8');
          const config = yaml.load(fileContent) as ConfigSchema;

          // prisma는 환경 변수로만 데이터베이스 url을 받을 수 있음
          process.env.DATABASE_URL = config.database.url;

          return config;
        },
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule, HealthModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

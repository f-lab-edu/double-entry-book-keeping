import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DateTimeModule } from 'src/date-time/date-time.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [PrismaModule, DateTimeModule, AuthModule, ConfigModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

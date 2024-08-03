import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DateTimeModule } from 'src/date-time/date-time.module';

@Module({
  imports: [PrismaModule, DateTimeModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

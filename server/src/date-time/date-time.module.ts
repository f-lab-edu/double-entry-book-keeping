import { Module } from '@nestjs/common';
import { DateTimeService } from './date-time.service';

@Module({
  providers: [DateTimeService],
  exports: [DateTimeService],
})
export class DateTimeModule {}

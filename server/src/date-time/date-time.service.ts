import { Injectable } from '@nestjs/common';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';

@Injectable()
export class DateTimeService {
  private readonly timeZone: string = 'Asia/Seoul';

  getCurrentKST(): string {
    const now = new Date();
    const zonedDate = toZonedTime(now, this.timeZone);
    return tzFormat(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', {
      timeZone: this.timeZone,
    });
  }
}

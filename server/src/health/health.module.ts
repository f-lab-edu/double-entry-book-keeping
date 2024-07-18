import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    PrismaModule,
    // 향후 쿠버네티스 적용을 염두에 둔 graceful shutdown
    TerminusModule.forRoot({
      gracefulShutdownTimeoutMs: 1000,
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_HOST,
    // 쿠키 허용을 위함
    credentials: true,
  });

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const clientConfig = configService.getClientConfig();

  app.enableCors({
    origin: clientConfig.host,
    // 쿠키 허용을 위함
    credentials: true,
  });

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

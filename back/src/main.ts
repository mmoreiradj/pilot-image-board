import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfigService } from './common/config/app-config.service';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.register(require('@fastify/multipart'));

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));

  const config = app.get<AppConfigService>(AppConfigService);

  const CORS_OPTIONS = {
    origin: config.corsOrigin,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE', 'PATCH'],
  };

  app.enableCors(CORS_OPTIONS);

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(config.port, '0.0.0.0');
}

bootstrap();

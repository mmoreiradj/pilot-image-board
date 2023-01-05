import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const CORS_OPTIONS = {
    origin: process.env.CORS_ORIGIN,
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

  const adapter = new FastifyAdapter();

  if (process.env.NODE_ENV === 'production') {
    adapter.enableCors(CORS_OPTIONS);
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  app.setGlobalPrefix('v1');
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Pilot API')
      .setDescription('An image board API')
      .setVersion('1.0')
      .addTag('pilot')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  if (process.env.NODE_ENV === 'production') {
    // await app.register(helmet, {
    //   contentSecurityPolicy: {
    //     directives: {
    //       defaultSrc: [`'self'`],
    //       styleSrc: [`'self'`, `'unsafe-inline'`],
    //       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
    //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    //     },
    //   },
    // });
  }

  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

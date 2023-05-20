import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Backend');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dockerized Nest JS API Gateway')
    .setDescription(
      'This API gatway documentation is for the dockerized nest js application with Postgresql DB',
    )
    .setVersion('v1.0.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);

  const PORT = process.env.PORT || 4999;
  await app.listen(PORT, () =>
    logger.log(`Backend is listening on port ${PORT}`),
  );
};

bootstrap();

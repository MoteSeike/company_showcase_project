import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from "passport";
import { ValidatePipe } from 'lib/ValidatePipe';
import { Logger } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Company ShowCase')
    .setDescription('The company showcase API description')
    .setVersion('1.0')
    .addTag('company')
    .setContact("Hello world", "/test", "test@df.com")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: "Student Register Backend", });
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin,X-Requested-Width,Content-Type,Accept,'
  });
  app.use(passport.initialize())
  app.use(express.json({limit:'15mb'}));
  app.use(express.urlencoded({ extended: true ,limit:'15mb'}));
  await app.useGlobalPipes(new ValidatePipe());
  const port = 3003;
  await app.listen(port);
  Logger.debug(`Application common listen port ${port} `)
}
bootstrap();

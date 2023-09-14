import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from "passport";
import { ValidatePipe } from 'lib/ValidatePipe';

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

  app.use(passport.initialize())
  await app.useGlobalPipes(new ValidatePipe());
  await app.listen(8085);
}
bootstrap();

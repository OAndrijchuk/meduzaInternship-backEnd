import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.setGlobalPrefix('api_v0.01');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();

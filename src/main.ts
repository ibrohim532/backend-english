import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('English Learning Platform API')
    .setDescription(
      'Ingliz tili o\'rganish platformasi uchun to\'liq Backend API. In-memory, tashqi server yo\'q.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Platform')
    .addTag('Profile')
    .addTag('Courses')
    .addTag('Lessons')
    .addTag('Tests')
    .addTag('Materials')
    .addTag('Results')
    .addTag('LiveClasses')
    .addTag('QA')
    .addTag('Notifications')
    .addTag('Certificates')
    .addTag('Payments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('API:     http://localhost:3000/api');
  console.log('Swagger: http://localhost:3000/docs');
}
bootstrap();

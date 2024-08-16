import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './modules/config/config.swagger';

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe()); //validate

  await app.listen(port, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap();

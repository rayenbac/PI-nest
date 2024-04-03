// main.ts or app.module.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,PUT,POST,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  await app.listen(3000);
}
bootstrap();

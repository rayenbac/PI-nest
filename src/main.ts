import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'; // Import path module

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,PUT,POST,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  // Serve static files from the public directory
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(3000);
}
bootstrap();

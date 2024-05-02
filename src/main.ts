import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Activer CORS avec des options spécifiques
  app.enableCors({
    origin: 'http://localhost:4200', // Autoriser les requêtes en provenance de ce domaine
    methods: 'GET,PUT,POST,DELETE', // Autoriser ces méthodes HTTP
    allowedHeaders: 'Content-Type, Authorization', // Autoriser ces en-têtes
    credentials: true, // Autoriser les demandes avec des cookies ou des en-têtes d'autorisation
  });

  // Servir les fichiers statiques depuis le répertoire public
  app.useStaticAssets(path.join(__dirname, '..', 'public'));


  await app.listen(3000);
}
bootstrap();

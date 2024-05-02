import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as cors from 'cors';

@WebSocketGateway({ cors: true })

@Injectable()
export class NotificationService {
  constructor(private readonly logger: Logger) {}

  @WebSocketServer()
  server: Server;

  // Ajoutez cette méthode pour activer CORS
  
  
  notifyNewProduct(productName: string, creationDate: string) {
    try {
      console.log("productName:", productName);
      console.log("creationDate:", creationDate);
  
      if (!productName || !creationDate) {
        throw new Error("productName and creationDate are required.");
      }
      
      // Émettre la notification
      this.server.emit('newProduct', { productName, creationDate });
      
      // Enregistrer un message de succès dans les logs
      // this.logger.log(`Notification envoyée avec succès : ${productName}, ${creationDate}`);
  
      // Renvoyer une réponse au client
      return {
        success: true,
        message: `Notification envoyée avec succès : ${productName}, ${creationDate}`
      };
    } catch (error) {
      // Enregistrer une erreur dans les logs
      this.logger.error(`Erreur lors de l'envoi de la notification : ${error.message}`);
      
      // Renvoyer une réponse d'erreur au client
      return {
        success: false,
        message: `Erreur lors de l'envoi de la notification : ${error.message}`
      };
    }
  }
  

  // Méthode pour gérer l'événement d'ajout de produit
  handleNewProductAdded(productName: string, creationDate: string) {
    // Appeler la méthode de notification avec les détails du produit ajouté
    this.notifyNewProduct(productName, creationDate);
  }
}

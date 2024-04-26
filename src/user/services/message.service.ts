// message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../entities/message.model';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}
  private readonly secretKey: string = 'your_secret_key';

  async createMessage(senderId: string, recipientId: string, content: string): Promise<Message> {
    const encryptedContent = this.encryptMessage(content);
    const message = new this.messageModel({ senderId, recipientId, content: encryptedContent, isRead: false });
    return message.save();
  }
  
  async getChatHistory(senderId: string, recipientId: string): Promise<Message[]> {
    const encryptedMessages = await this.messageModel
      .find({ $or: [{ senderId, recipientId }, { senderId: recipientId, recipientId: senderId }] })
      .populate('senderId', 'fullName') // Populate senderId with fullName
      .populate('recipientId', 'fullName') // Populate recipientId with fullName
      .select('-__v'); // Exclude __v field from the result
      return encryptedMessages.map(message => ({
        ...message.toJSON(),
        content: this.decryptMessage(message.content)
      }));
    }
  
  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    // Find the message by ID and update its isRead attribute
    await this.messageModel.findOneAndUpdate(
      { _id: messageId, recipientId: userId }, // Only allow marking as read if the message belongs to the user
      { $set: { isRead: true } }
    );
  }
  encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.secretKey).toString();
  }

  decryptMessage(encryptedMessage: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting message:', error);
      return ''; // Return an empty string or handle the error as appropriate
    }
  }
  
}

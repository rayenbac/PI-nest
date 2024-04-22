// message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../entities/message.model';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async createMessage(senderId: string, recipientId: string, content: string): Promise<Message> {
    const message = new this.messageModel({ senderId, recipientId, content, isRead: false }); // Set isRead to false
    return message.save();
  }
  
  async getChatHistory(senderId: string, recipientId: string): Promise<Message[]> {
    return this.messageModel
      .find({ $or: [{ senderId, recipientId }, { senderId: recipientId, recipientId: senderId }] })
      .populate('senderId', 'fullName') // Populate senderId with fullName
      .populate('recipientId', 'fullName') // Populate recipientId with fullName
      .select('-__v'); // Exclude __v field from the result
  }
  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    // Find the message by ID and update its isRead attribute
    await this.messageModel.findOneAndUpdate(
      { _id: messageId, recipientId: userId }, // Only allow marking as read if the message belongs to the user
      { $set: { isRead: true } }
    );
  }
  
}

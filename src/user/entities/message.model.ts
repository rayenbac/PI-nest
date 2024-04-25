import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Message extends Document {
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
   senderId: mongoose.Types.ObjectId;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipientId: mongoose.Types.ObjectId;
  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false }) // Add this line to indicate message read status
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema);

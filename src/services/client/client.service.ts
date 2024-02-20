import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client,ClientModel } from 'src/models/client.model';
import { CreateClientDto, UpdateClientDto } from 'src/models/client.dto';
import { OrderModel } from 'src/models/order.model';

@Injectable()
export class ClientService {
  constructor(@Inject('CLIENT_MODEL') private readonly clientModel: Model<Client>) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findAllClients(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findClientById(clientId: string): Promise<Client> {
    return this.clientModel.findById(clientId).exec();
  }

  async updateClient(clientId: string, updateClientDto: UpdateClientDto): Promise<Client> {
    return this.clientModel.findByIdAndUpdate(clientId, updateClientDto, { new: true }).exec();
  }

  async deleteClient(clientId: string): Promise<Client> {
    return this.clientModel.findByIdAndDelete(clientId).exec();
  }
  async createOrder(clientId: string, orderData: any): Promise<any> {
    const client = await this.clientModel.findById(clientId).exec();
    const order = new OrderModel({ ...orderData, client: client._id }); // Create new order associated with client
    client.orders.push(order); // Add order reference to client's orders
    await client.save(); // Save client
    return order.save(); // Return the newly created order
  }
}
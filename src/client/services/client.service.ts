import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client,ClientModel } from 'src/client/entities/Client.entity';
import { CreateClientDto, UpdateClientDto } from 'src/client/entities/client.dto';
import { Order, OrderModel } from 'src/order/entities/Order.entity';
import { Product, ProductModel } from 'src/product/entities/Product.entity';
import { User } from 'src/user/entities/User.model';

@Injectable()
export class ClientService {
  constructor(@Inject('CLIENT_MODEL') private readonly clientModel: Model<Client>) {}


  async createClientWithUser(CreateClientDto: CreateClientDto, user: User): Promise<Client> {
    const createdClient = new this.clientModel({
      ...CreateClientDto,
      createdBy: user._id,
     company:user.company._id
    });
    return createdClient.save();
  }

  async findClientByCompany(companyId: string): Promise<Client[]> {
    return this.clientModel.find({ company: companyId }).exec();
  }

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
 /* async createOrder(clientId: string, orderData: any): Promise<any> {
    const client = await this.clientModel.findById(clientId).exec();
    const order = new OrderModel({ ...orderData, client: client._id }); // Create new order associated with client
    client.orders.push(order); // Add order reference to client's orders
    await client.save(); // Save client
    return order.save(); // Return the newly created order
  }

  async createOrder(clientId: string, product: Product): Promise<Order> {
    // on va chercher le client
    const client = await this.clientModel.findById(clientId).exec();
    if (!client) {
      throw new Error('Client not found');
    }

    // on va creer le produits s'il n'a pas id
    if (!product._id) {
      const newProduct = new ProductModel(product);
      await newProduct.save();
      product = newProduct;
    }

    // on va creer l'order
    const order = new OrderModel({
      totalPrice: product.price,
      status: 'Pending', 
      client: client._id,
      products: [product._id], // association avec le produits
    });

    // ajouter l'ordre a client
    client.orders.push(order);

  
    await Promise.all([client.save(), order.save()]);

    return order;
  }
  */
}


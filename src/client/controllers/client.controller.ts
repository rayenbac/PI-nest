import { ClientService } from 'src/client/services/client.service';
import { CreateClientDto, UpdateClientDto } from 'src/client/entities/client.dto';
import { Client } from 'src/client/entities/Client.entity';
import { OrderService } from 'src/order/services/order.service';
import { Product } from 'src/product/entities/Product.entity';
import { Order } from 'src/order/entities/Order.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('clients')
export class ClientController {
  constructor( private readonly clientService: ClientService,
    private readonly orderService: OrderService) {}

  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  async findAllClients(): Promise<Client[]> {
    return this.clientService.findAllClients();
  }

  @Get(':id')
  async findClientById(@Param('id') id: string): Promise<Client> {
    return this.clientService.findClientById(id);
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
  /*@Post(':clientId/orders')
  async createOrder(@Param('clientId') clientId: string, @Body() orderData: any): Promise<any> {
    return this.clientService.createOrder(clientId, orderData);
  }*/
  @Post(':clientId/orders')
  async createOrder(
    @Param('clientId') clientId: string,
    @Body() product: Product
  ): Promise<Order> {
    return this.clientService.createOrder(clientId, product);
  }
}
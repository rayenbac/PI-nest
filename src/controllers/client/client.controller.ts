import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientService } from 'src/services/client/client.service';
import { CreateClientDto, UpdateClientDto } from 'src/models/client.dto';
import { Client } from 'src/models/client.model';
import { OrderService } from 'src/services/order/order.service';

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
  @Post(':clientId/orders')
  async createOrder(@Param('clientId') clientId: string, @Body() orderData: any): Promise<any> {
    return this.clientService.createOrder(clientId, orderData);
  }
}
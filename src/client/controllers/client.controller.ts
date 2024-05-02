import { ClientService } from 'src/client/services/client.service';
import { CreateClientDto, UpdateClientDto } from 'src/client/entities/client.dto';
import { Client } from 'src/client/entities/Client.entity';
import { Body, Controller, Delete, Get,NotFoundException,Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { OrderService } from 'src/order/services/order.service';
import { UserModel } from 'src/user/entities/User.model';
import { isValidObjectId } from 'mongoose';


@Controller('clients')
export class ClientController {
  constructor( private readonly clientService: ClientService,) {}

    @UseGuards(AuthGuard)
    @Post('by-company')
    async createClientebycompany(@Body() CreateClientDto: CreateClientDto, @Request() req) {
      const userId = req.user.userId;
      const user = await UserModel.findById(userId);
      const clientData = { ...CreateClientDto, companyId: user.company._id }; // Set the company ID from the user
      const client = await this.clientService.createClientWithUser(clientData, user);
      return client;
    }

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
  @Get('by-company/:companyId')
  async findClientByCompany(@Param('companyId') companyId: string): Promise<Client[]> {
    if (!isValidObjectId(companyId)) {
      throw new NotFoundException('Invalid company ID');
    }
    return this.clientService.findClientByCompany(companyId);
  }
}
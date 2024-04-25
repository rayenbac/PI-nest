<<<<<<< HEAD
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { OrderService } from 'src/order/services/order.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/entities/order.dto';
import { Order } from 'src/order/entities/Order.entity';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModel } from 'src/user/entities/User.model';
import { isValidObjectId } from 'mongoose';
=======
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from 'src/order/services/order.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/entities/order.dto';
import { Order } from 'src/order/entities/Order.entity';
>>>>>>> origin/master

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

<<<<<<< HEAD
  @UseGuards(AuthGuard)
  @Post('by-company')
  async createOrderbycompany(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    const orderData = { ...createOrderDto, companyId: user.company._id }; // Set the company ID from the user
    const order = await this.orderService.createOrderWithUser(orderData, user);
    return order;
  }
  

=======
>>>>>>> origin/master
  @Get()
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  @Get(':id')
  async findOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOrderById(id);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
<<<<<<< HEAD

  @Get('by-company/:companyId')
  async findOrdersByCompany(@Param('companyId') companyId: string): Promise<Order[]> {
    if (!isValidObjectId(companyId)) {
      throw new NotFoundException('Invalid company ID');
    }

    return this.orderService.findOrdersByCompany(companyId);
  }
=======
>>>>>>> origin/master
}

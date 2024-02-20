// order.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from 'src/services/order/order.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/models/order.dto';
import { Order } from 'src/models/order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

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
}

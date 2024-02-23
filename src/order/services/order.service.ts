// order.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from 'src/order/entities/Order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/entities/order.dto';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_MODEL') private readonly orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).exec();
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(orderId, updateOrderDto, { new: true }).exec();
  }

  async deleteOrder(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(orderId).exec();
  }
}

// order.service.ts

import { Injectable, Inject } from '@nestjs/common';
<<<<<<< HEAD
import { Model, Types } from 'mongoose';
import { Order } from 'src/order/entities/Order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/entities/order.dto';
import { User } from 'src/user/entities/User.model';
=======
import { Model } from 'mongoose';
import { Order } from 'src/order/entities/Order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/entities/order.dto';
>>>>>>> origin/master

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_MODEL') private readonly orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

<<<<<<< HEAD
  async createOrderWithUser(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      createdBy: user._id,
     company:user.company._id
    });
    return createdOrder.save();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate('products').populate('client').exec();
  }

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).populate('client').exec();
=======
  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).exec();
>>>>>>> origin/master
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(orderId, updateOrderDto, { new: true }).exec();
  }

  async deleteOrder(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(orderId).exec();
  }
<<<<<<< HEAD

  async findOrdersByCompany(companyId: string): Promise<Order[]> {
    return this.orderModel.find({ company: companyId }).populate('company').populate('products').populate('client').exec();
  }
=======
>>>>>>> origin/master
}

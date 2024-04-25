import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../entities/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let mockOrderModel: Model<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getModelToken('Order'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
            exec: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    mockOrderModel = module.get<Model<Order>>(getModelToken('Order'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        totalPrice: 100,
        status: 'pending',
        client: 'clientId',
        products: ['productId1', 'productId2'],
      };

      await service.createOrder(createOrderDto);

      expect(mockOrderModel.create).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('findAllOrders', () => {
    it('should return all orders', async () => {
      await service.findAllOrders();

      expect(mockOrderModel.find).toHaveBeenCalled();
    });
  });

  describe('findOrderById', () => {
    it('should find a specific order by ID', async () => {
      const orderId = 'mockId';

      await service.findOrderById(orderId);

      expect(mockOrderModel.findById).toHaveBeenCalledWith(orderId);
    });
  });

  describe('updateOrder', () => {
    it('should update a specific order', async () => {
      const orderId = 'mockId';
      const updateOrderDto: UpdateOrderDto = {
        totalPrice: 200,
        status: 'completed',
        client: 'clientIdUpdated',
        products: ['productId3', 'productId4'],
      };

      await service.updateOrder(orderId, updateOrderDto);

      expect(mockOrderModel.findByIdAndUpdate).toHaveBeenCalledWith(orderId, updateOrderDto, { new: true });
    });
  });

  describe('deleteOrder', () => {
    it('should delete a specific order', async () => {
      const orderId = 'mockId';

      await service.deleteOrder(orderId);

      expect(mockOrderModel.findByIdAndDelete).toHaveBeenCalledWith(orderId);
    });
  });
});

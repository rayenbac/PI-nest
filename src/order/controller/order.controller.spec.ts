import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
<<<<<<< HEAD


//   describe('createOrder', () => {
//     it('should create a new order', async () => {
//       const clientId = new mongoose.Types.ObjectId().toHexString(); // Example of creating ObjectId

//       const createOrderDto: CreateOrderDto = {
//         totalPrice: 100,
//         status: 'pending',
//         client: clientId, // Example value for client ID
//         products: ['productId1', 'productId2'], // Example values for product IDs
//       };
//       const mockOrder: Order = {
//         totalPrice: 100,
//         status: 'pending',
//         client: clientId, // Example value for client ID
//         products: ['productId1', 'productId2'], // Example values for product IDs
//         _id: 'mockId', // Example value for order ID
//       };

//       jest.spyOn(orderService, 'createOrder').mockResolvedValue(mockOrder);

//       const result = await controller.createOrder(createOrderDto);

//       expect(result).toEqual(mockOrder);
//     });
//   });

//   describe('findAllOrders', () => {
//     it('should return all orders', async () => {
//       const mockOrders: Order[] = [
//         {
//           totalPrice: 100,
//           status: 'pending',
//           client: 'clientId1', // Example value for client ID
//           products: ['productId1', 'productId2'], // Example values for product IDs
//           _id: 'mockId1', // Example value for order ID
//         },
//         {
//           totalPrice: 200,
//           status: 'completed',
//           client: 'clientId2', // Example value for client ID
//           products: ['productId3', 'productId4'], // Example values for product IDs
//           _id: 'mockId2', // Example value for order ID
//         },
//       ];

//       jest.spyOn(orderService, 'findAllOrders').mockResolvedValue(mockOrders);

//       const result = await controller.findAllOrders();

//       expect(result).toEqual(mockOrders);
//     });
//   });

//   describe('findOrderById', () => {
//     it('should return a specific order by id', async () => {
//       const orderId = 'mockId';
//       const mockOrder: Order = {
//         totalPrice: 100,
//         status: 'pending',
//         client: 'clientId', // Example value for client ID
//         products: ['productId1', 'productId2'], // Example values for product IDs
//         _id: orderId, // Example value for order ID
//       };

//       jest.spyOn(orderService, 'findOrderById').mockResolvedValue(mockOrder);

//       const result = await controller.findOrderById(orderId);

//       expect(result).toEqual(mockOrder);
//     });
//   });

//   describe('updateOrder', () => {
//     it('should update a specific order', async () => {
//       const orderId = 'mockId';
//       const updateOrderDto: UpdateOrderDto = {
//         totalPrice: 200,
//         status: 'completed',
//         client: 'clientIdUpdated', // Example updated value for client ID
//         products: ['productId3', 'productId4'], // Example updated values for product IDs
//       };
//       const mockOrder: Order = {
//         totalPrice: 200,
//         status: 'completed',
//         client: 'clientIdUpdated', // Example updated value for client ID
//         products: ['productId3', 'productId4'], // Example updated values for product IDs
//         _id: orderId, // Example value for order ID
//       };

//       jest.spyOn(orderService, 'updateOrder').mockResolvedValue(mockOrder);

//       const result = await controller.updateOrder(orderId, updateOrderDto);

//       expect(result).toEqual(mockOrder);
//     });
//   });

//   describe('deleteOrder', () => {
//     it('should delete a specific order', async () => {
//       const orderId = 'mockId';
//       const mockOrder: Order = {
//         totalPrice: 100,
//         status: 'pending',
//         client: 'clientId', // Example value for client ID
//         products: ['productId1', 'productId2'], // Example values for product IDs
//         _id: orderId, // Example value for order ID
//       };

//       jest.spyOn(orderService, 'deleteOrder').mockResolvedValue(mockOrder);

//       const result = await controller.deleteOrder(orderId);

//       expect(result).toEqual(mockOrder);
//     });
//   });
// });
=======
>>>>>>> origin/master

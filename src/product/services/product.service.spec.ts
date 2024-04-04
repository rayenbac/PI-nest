import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductModel } from '../entities/Product.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProductDto } from '../entities/product.dto';
import { User } from 'src/user/entities/User.model'; 
import { AuthService } from 'src/user/services/auth.service';


describe('ProductService', () => {
  let service: ProductService;
  let productModel: typeof ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: ProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productModel = module.get<typeof ProductModel>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockCreateProductDto: CreateProductDto = {
        nameP: 'Test Product',
        discount: 10,
        price: 100,
        quantity: 50,
        type: 'Test Type',
        supplier: 'Test Supplier',
        filePath: 'Test File Path',
        company: 'company_id',
      };

      const mockUser: Partial<User> = {
        id: 'user_id',
        fullName: 'John Doe',
        login: 'johndoe',
        password: 'password123',
        role: 'admin',
        company: 'ACME Inc.',
      };

      const mockProduct = {
        ...mockCreateProductDto,
        _id: 'product_id',
        createdBy: 'user_id', // Ajout de createdBy dans l'objet mockProduct
      };

      jest.spyOn(productModel.prototype, 'save').mockResolvedValueOnce(mockProduct);

      const createdProduct = await service.createProduct(mockCreateProductDto, mockUser as User);
      expect(createdProduct).toEqual(mockProduct);
    });
  });


});

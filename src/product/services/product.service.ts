// product.service.ts

import { Injectable, Inject } from '@nestjs/common';
import mongoose, { Model, Types } from 'mongoose';
import { Product } from 'src/product/entities/Product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/product/entities/product.dto';
import { User, UserModel } from 'src/user/entities/User.model';
import { AuthService } from 'src/user/services/auth.service';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,private readonly authService: AuthService,) {}

  async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      createdBy: user._id,
     company:user.company._id
    });
    return createdProduct.save();
  }
  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findProductById(productId: string): Promise<Product> {
    return this.productModel.findById(productId).exec();
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(productId, updateProductDto, { new: true }).exec();
  }

  async deleteProduct(productId: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(productId).exec();
  }
  async findProductsCreatedByUser(userId: string): Promise<Product[]> {
    return this.productModel.find({ createdBy: userId }).exec();
  }
  async findProductsByCompany(companyId: string): Promise<Product[]> {
    return this.productModel.find({ company: companyId }).exec();
  }
  
  /*
  async findProductsByCompanyId(companyId: string): Promise<Product[]> {
    // Find users belonging to the company
    const users = await this.userModel.find({ company: companyId }).exec();
    const userIds = users.map(user => user._id);

    // Find products created by users belonging to the company
    return this.productModel.find({ createdBy: { $in: userIds } }).exec();
  }*/
}

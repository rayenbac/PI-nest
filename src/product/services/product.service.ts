// product.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../entities/Product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/product/entities/product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
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
}

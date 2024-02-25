import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ProductService } from 'src/product/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/product/entities/product.dto';
import { Product } from 'src/product/entities/Product.entity';
import { JwtAuthGuard } from 'src/user/entities/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
/*
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
   
    const userId = '65d9daa493c3bc34adafd6f5'; // Replace 'user_id_here' with actual userId
    return this.productService.createProduct(userId, createProductDto);
  }*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.userId; // Extract user ID from JWT payload
    return this.productService.createProduct(createProductDto, userId);
  }


  
  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
/* 
 async createProduct(user: User, createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      createdBy: user._id, 
    });
    return createdProduct.save();
  }
  */ 
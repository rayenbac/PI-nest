import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ProductService } from 'src/product/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/product/entities/product.dto';
import { Product } from 'src/product/entities/Product.entity';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModel } from 'src/user/entities/User.model';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto, @Request() req) {
    // Fetch the user object using the userId from the request
    const userId = req.user.userId; // Assuming userId is available in the request after authentication
    const user = await UserModel.findById(userId);

    // Create the product with the associated user object
    const product = await this.productService.createProduct(createProductDto, user);

    // Return the created product in the response
    return product;
  } 


  
  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Get('getbyid/:id')
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

  @UseGuards(AuthGuard)
  @Get('created')
  async findProductsCreatedByUser(@Request() req): Promise<Product[]> {
    try {
      const userId = req.user.userId;
      const products = await this.productService.findProductsCreatedByUser(userId);
      
      // Log the retrieved products for debugging
      console.log('Products created by user:', products);
  
      return products;
    } catch (error) {
      // Log any errors that occur during the process
      console.error('Error retrieving products:', error.message);
      throw error; // Rethrow the error to propagate it
    }
  }
@Get('by-company/:companyId')
  async findProductsByCompany(@Param('companyId') companyId: string): Promise<Product[]> {
    return this.productService.findProductsByCompany(companyId);
  }
}

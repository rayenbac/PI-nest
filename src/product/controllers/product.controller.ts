import { ProductService } from 'src/product/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/product/entities/product.dto';
import { Product } from 'src/product/entities/Product.entity';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModel } from 'src/user/entities/User.model';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards,Request, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
import { diskStorage } from 'multer';
import { get } from 'http';
import { Response } from 'express';
import { join } from 'path';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)

  @Post()
 async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
    
  ) {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);

    // Construct the product object
    const product: CreateProductDto = {
      ...createProductDto,
      // Set the image path to the filename
    };

    return this.productService.createProduct(product, user);
  }

  @UseGuards(AuthGuard)
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
  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, `${uniqueSuffix}.${extension}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Only image files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('No file uploaded');
    } else {
      const response  ={
         imagepath: `http://localhost:3000/products/photo/${file.filename}`
       };
      // return response ;
    }
   
    // const filePath = await this.productService.uploadFile(file);
    //  return { filePath };
  }
  @Get('photo/:filename')   
  async getphoto(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join('C:\\Users\\skand\\Desktop\\Pi-nest\\PI-nest\\uploads', filename);
    res.sendFile(filePath);
  }
}

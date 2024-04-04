// product.dto.ts

export class CreateProductDto {
    readonly nameP: string;
    readonly discount: number;
    readonly price: number;
    readonly quantity: number;
    readonly type: string;
    readonly supplier: string;
    readonly filePath: string;
    readonly company?: string;

  }
  
  export class UpdateProductDto {
    readonly nameP?: string;
    readonly discount?: number;
    readonly price?: number;
    readonly quantity?: number;
    readonly type?: string;
    readonly supplier?: string;
    readonly filePath?: string;
    readonly company?: string;

  }
  
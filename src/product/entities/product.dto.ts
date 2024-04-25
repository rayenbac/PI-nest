// product.dto.ts

export class CreateProductDto {
    readonly nameP: string;
    readonly discount: number;
    readonly Salingprice: number;
    readonly Buyingprice: number;
    readonly quantity: number;
    readonly type: string;
    readonly supplier: string;


  }
  
  export class UpdateProductDto {
    readonly nameP?: string;
    readonly discount?: number;
    readonly Salingprice?:number;
    readonly Buyingprice?: number;
    readonly quantity?: number;
    readonly type?: string;
    readonly supplier?: string;


  }
  
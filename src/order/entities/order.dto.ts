// order.dto.ts

export class CreateOrderDto {
<<<<<<< HEAD
  readonly totalPrice: number;
  readonly status: string;
  readonly client: string;
  readonly products: string[];
   // Array of product IDs
}

export class UpdateOrderDto {
  readonly totalPrice?: number;
  readonly status?: string;
  readonly client?: string;
  readonly products?: string[]; // Array of product IDs
}
=======
    readonly totalPrice: number;
    readonly status: string;
  }
  
  export class UpdateOrderDto {
    readonly totalPrice?: number;
    readonly status?: string;
  }
  
>>>>>>> origin/master

// order.dto.ts

export class CreateOrderDto {
    readonly totalPrice: number;
    readonly status: string;
  }
  
  export class UpdateOrderDto {
    readonly totalPrice?: number;
    readonly status?: string;
  }
  
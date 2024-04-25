// supplier.dto.ts

import mongoose from "mongoose";

export class CreateSupplierDto {
    readonly nameS: string;
    readonly address: string;
    readonly phoneNumber: number;
    readonly productType: string;
    products: mongoose.Types.ObjectId[];
  }
  
  export class UpdateSupplierDto {
    readonly nameS?: string;
    readonly address?: string;
    readonly phoneNumber?: number;
    readonly productType?: string;
    readonly products?: string[];
  }

// supplier.dto.ts

import mongoose from "mongoose";

export class CreateSupplierDto {
    readonly nameS: string;
    readonly contactInfo: string;
    products: mongoose.Types.ObjectId[];
  }
  
  export class UpdateSupplierDto {
    readonly nameS?: string;
    readonly contactInfo?: string;
    readonly products?: string[];
  }
  
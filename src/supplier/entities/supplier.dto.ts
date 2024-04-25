// supplier.dto.ts

import mongoose from "mongoose";

export class CreateSupplierDto {
    readonly nameS: string;
<<<<<<< HEAD
    readonly address: string;
    readonly phoneNumber: number;
    readonly productType: string;
=======
    readonly contactInfo: string;
>>>>>>> origin/master
    products: mongoose.Types.ObjectId[];
  }
  
  export class UpdateSupplierDto {
    readonly nameS?: string;
<<<<<<< HEAD
    readonly address?: string;
    readonly phoneNumber?: number;
    readonly productType?: string;
    readonly products?: string[];
  }
=======
    readonly contactInfo?: string;
    readonly products?: string[];
  }
  
>>>>>>> origin/master

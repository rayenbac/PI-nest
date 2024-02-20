// supplier.dto.ts

export class CreateSupplierDto {
    readonly nameS: string;
    readonly contactInfo: string;
  }
  
  export class UpdateSupplierDto {
    readonly nameS?: string;
    readonly contactInfo?: string;
  }
  
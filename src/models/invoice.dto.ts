

export class CreateInvoiceDto {
    readonly dueDate: Date;
    readonly refInvoice: string;
  }
  
  export class UpdateInvoiceDto {
    readonly dueDate?: Date;
    readonly refInvoice?: string;
  }
  


export class CreateInvoiceDto {
<<<<<<< HEAD
    readonly date: string;
    readonly gain: number;
    readonly revenu: number;
  }
  
  export class UpdateInvoiceDto {
    readonly date?: string;
    readonly gain?: number;
    readonly revenu?: number;
=======
    readonly dueDate: Date;
    readonly refInvoice: string;
  }
  
  export class UpdateInvoiceDto {
    readonly dueDate?: Date;
    readonly refInvoice?: string;
>>>>>>> origin/master
  }
  
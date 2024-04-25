

export class CreateInvoiceDto {
    readonly date: string;
    readonly gain: number;
    readonly revenu: number;
  }
  
  export class UpdateInvoiceDto {
    readonly date?: string;
    readonly gain?: number;
    readonly revenu?: number;
  }
  
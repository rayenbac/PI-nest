export class CreateClientDto {
    readonly id_Client: number;
    readonly nameC: string;
    readonly phoneNumber: string;
    readonly reference: string;
  }

export class UpdateClientDto {
    readonly nameC?: string;
    readonly phoneNumber?: string;
    readonly reference?: string;
  }

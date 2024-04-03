export class CreateClientDto {
  readonly id_Client: number;
  readonly nameC: string;
  readonly phoneNumber: number;
  readonly reference: string;
}

export class UpdateClientDto {
  readonly nameC?: string;
  readonly phoneNumber?: number;
  readonly reference?: string;
}

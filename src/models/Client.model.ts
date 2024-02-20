export class Client {
    id_Client: number;
    nameC: string;
    phoneNumber: string;
    reference: string;

    constructor(id: number, name: string, phoneNumber: string, ref: string) {
        this.id_Client = id;
        this.nameC = name;
        this.phoneNumber = phoneNumber;
        this.reference = ref;
    }

    // You can add methods related to managing client information here
}
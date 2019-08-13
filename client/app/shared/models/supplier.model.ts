export class Supplier {
    _id: string;
    supplierName: String;
    address: String;
    phoneNumber: String;
    email: String;
    createdAt: Date;
    invoiceScheme: {
        date: String,
        id: String,
        payment: String
    };
}

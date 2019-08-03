import * as mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  username: String,
  invoiceId: Number,
  supplierName: String,
  totalPayment: Number,
  invoiceDate: String,
  createdAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;




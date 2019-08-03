import * as mongoose from 'mongoose';
import User from "./user";

const invoiceSchema = new mongoose.Schema({
  username: String,
  invoiceId: Number,
  supplierName: String,
  totalPayment: Number,
  invoiceDate: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

// After saving the invoice, add ref to user
invoiceSchema.post('save', function (next) {
  const invoice = this;

  // add id to user
  User.findOneAndUpdate(
    { _id: invoice.user },
    { $push: { invoices: invoice } },
    function (err) {
      if (err) {
        return console.error(err);
      }
    });
});

// Auto populate user
invoiceSchema.pre('find', function (next) {
  this.populate('user');
  next();
});

invoiceSchema.pre('remove', function (next) {
  User.update(
    { _id: this.user },
    { $pull: { invoices: this._id } },
    { multi: true });

  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;




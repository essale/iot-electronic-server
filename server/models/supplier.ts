import * as mongoose from "mongoose";
import User from "./user";

const supplierSchema = new mongoose.Schema({
  supplierName: String,
  address: String,
  phoneNumber: Number,
  faxNumber: Number,
  email: { type: String, unique: true, lowercase: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  invoiceScheme: { date: String, id: String, payment: String }
});


// After saving the supplier, add ref to user
supplierSchema.post('save', function (next) {
  const supplier = this;
  // add id to user
  User.findOneAndUpdate(
    { _id: supplier.user },
    { $push: { suppliers: supplier } },
    function (err) {
      if (err) {
        return console.error(err);
      }
    });
});

// Auto populate user
supplierSchema.pre('find', function (next) {
  this.populate('user');
  next();
});

supplierSchema.pre('remove', function (next) {
  User.update(
    { _id: this.user },
    { $pull: { suppliers: this._id } },
    { multi: true });

  next();
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;

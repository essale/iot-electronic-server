"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var user_1 = require("./user");
var invoiceSchema = new mongoose.Schema({
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
    var invoice = this;
    // add id to user
    user_1.default.findOneAndUpdate({ _id: invoice.user }, { $push: { invoices: invoice } }, function (err) {
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
    user_1.default.update({ _id: this.user }, { $pull: { invoices: this._id } }, { multi: true });
    next();
});
var Invoice = mongoose.model('Invoice', invoiceSchema);
exports.default = Invoice;
//# sourceMappingURL=invoice.js.map
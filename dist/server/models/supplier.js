"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var supplierSchema = new mongoose.Schema({
    supplierName: String,
    address: String,
    phoneNumber: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    invoiceScheme: { date: String, id: String, payment: String }
});
var Supplier = mongoose.model('Supplier', supplierSchema);
exports.default = Supplier;
//# sourceMappingURL=supplier.js.map
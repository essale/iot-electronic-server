"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var supplier_1 = require("../models/supplier");
var base_1 = require("./base");
var SupplierCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(SupplierCtrl, _super);
    function SupplierCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = supplier_1.default;
        return _this;
    }
    return SupplierCtrl;
}(base_1.default));
exports.default = SupplierCtrl;
//# sourceMappingURL=supplier.js.map
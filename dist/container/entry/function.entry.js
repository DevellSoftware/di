"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionEntry = void 0;
const entry_1 = require("../entry/entry");
class FunctionEntry extends entry_1.Entry {
    typeName = "function";
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.FunctionEntry = FunctionEntry;

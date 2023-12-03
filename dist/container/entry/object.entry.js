"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectEntry = void 0;
const entry_1 = require("../entry/entry");
class ObjectEntry extends entry_1.Entry {
    typeName = "object";
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.ObjectEntry = ObjectEntry;

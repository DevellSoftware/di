"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryEntry = void 0;
const entry_1 = require("../entry/entry");
class FactoryEntry extends entry_1.Entry {
    factoryMethod;
    typeName = "factory";
    constructor(factoryMethod) {
        super();
        this.factoryMethod = factoryMethod;
    }
    getValue() {
        return this.factoryMethod;
    }
    create(container) {
        return this.factoryMethod(container);
    }
}
exports.FactoryEntry = FactoryEntry;

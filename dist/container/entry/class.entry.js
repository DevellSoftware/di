"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassEntry = void 0;
const injectable_decorator_1 = require("../decorators/injectable.decorator");
const entry_1 = require("../entry/entry");
const element_not_declared_as_injectable_exception_1 = require("../exception/element-not-declared-as-injectable.exception");
require("reflect-metadata");
class ClassEntry extends entry_1.Entry {
    typeName = "class";
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    static isClass(target) {
        function isClass(target) {
            return (typeof target === "function" &&
                /^\s*class\s+/.test(target.toString()) &&
                Object.getOwnPropertyDescriptor(target, "prototype") != undefined);
        }
        const isAClass = isClass(target);
        return isAClass;
    }
    getConstructorParams() {
        if (!this.value) {
            throw new Error("Missconfigured class entry");
        }
        const injectable = Reflect.getMetadata(injectable_decorator_1.REFLECT_INJECTABLE, this.value);
        if (!injectable) {
            throw new element_not_declared_as_injectable_exception_1.ElementNotDeclaredAsInjectableException(this.value.name);
        }
        const constructorLine = this.value.prototype.constructor
            .toString()
            .split("\n")
            .find((line) => {
            return line.includes("constructor");
        });
        if (!constructorLine) {
            return {};
        }
        const params = constructorLine
            .replace("constructor", "")
            .replace("(", "")
            .replace(")", "")
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((param) => {
            return param.trim();
        });
        if (params) {
            return {};
        }
        const types = Reflect.getMetadata(injectable_decorator_1.REFLECT_INJECTABLE_PARAMS, this.value.prototype.constructor);
        const paramsWithTypes = {};
        for (const paramIndex in params) {
            const type = types[paramIndex];
            paramsWithTypes[paramIndex] = {
                name: params[paramIndex],
                type: type,
            };
        }
        return paramsWithTypes;
    }
}
exports.ClassEntry = ClassEntry;

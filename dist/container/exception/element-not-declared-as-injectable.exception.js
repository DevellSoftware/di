"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementNotDeclaredAsInjectableException = void 0;
class ElementNotDeclaredAsInjectableException extends Error {
    constructor(name) {
        super(`Element ${name} with name ${name} is not declared as injectable.`);
    }
}
exports.ElementNotDeclaredAsInjectableException = ElementNotDeclaredAsInjectableException;

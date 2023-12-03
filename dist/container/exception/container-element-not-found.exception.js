"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerElementNotFoundException = void 0;
class ContainerElementNotFoundException extends Error {
    constructor(containerKey) {
        super(`Container element not found: ${containerKey}`);
    }
}
exports.ContainerElementNotFoundException = ContainerElementNotFoundException;

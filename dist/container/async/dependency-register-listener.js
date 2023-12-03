"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyRegisterListener = void 0;
const listener_1 = require("../async/listener");
class DependencyRegisterListener extends listener_1.Listener {
    name;
    dependencies;
    entry;
    onAllDepsRegistered;
    typeName = "dependency-register-listener";
    registeredAlready = [];
    constructor(name, dependencies, entry, onAllDepsRegistered) {
        super();
        this.name = name;
        this.dependencies = dependencies;
        this.entry = entry;
        this.onAllDepsRegistered = onAllDepsRegistered;
    }
    trigger(entry) {
        let found = false;
        const entryValue = entry.getValue();
        const constructorParams = this.entry.getConstructorParams();
        for (const [paramName, paramType] of Object.entries(constructorParams)) {
            if (paramType == entry.getValue().constructor.name) {
                this.registeredAlready.push(paramName);
            }
        }
        if (this.registeredAlready.length === this.dependencies.length) {
            this.onAllDepsRegistered(entryValue);
        }
    }
}
exports.DependencyRegisterListener = DependencyRegisterListener;

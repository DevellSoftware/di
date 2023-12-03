"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injectable_decorator_1 = require("./decorators/injectable.decorator");
const tag_decorator_1 = require("./decorators/tag.decorator");
const class_entry_1 = require("./entry/class.entry");
const function_entry_1 = require("./entry/function.entry");
const object_entry_1 = require("./entry/object.entry");
const container_element_not_found_exception_1 = require("./exception/container-element-not-found.exception");
const element_not_declared_as_injectable_exception_1 = require("./exception/element-not-declared-as-injectable.exception");
class Container {
    entries = new Map();
    ContainerTagDecorators = [];
    register(key, value) {
        const tags = Reflect.getMetadata(tag_decorator_1.REFLECT_TAG, value) || [];
        for (const tag of tags) {
            value = this.ContainerTagDecorators.find((tagDecorator) => {
                console.log(tagDecorator.name, tag.name);
                return tagDecorator.name === tag.name;
            })?.decorator(this, value);
        }
        if (class_entry_1.ClassEntry.isClass(value)) {
            this.entries.set(key, new class_entry_1.ClassEntry(value));
        }
        else if (typeof value === "function") {
            this.entries.set(key, new function_entry_1.FunctionEntry(value));
        }
        else if (typeof value === "object") {
            this.entries.set(key, new object_entry_1.ObjectEntry(value));
        }
    }
    resolve(key) {
        const entry = this.entries.get(key);
        let value = null;
        if (entry == undefined) {
            throw new container_element_not_found_exception_1.ContainerElementNotFoundException(key);
        }
        if (class_entry_1.ClassEntry.isClass(entry.getValue())) {
            value = this.initialize(entry);
        }
        else if (entry.typeName === "function") {
            value = entry.getValue();
        }
        else if (entry.typeName === "object") {
            value = entry.getValue();
        }
        if (!value) {
            throw new container_element_not_found_exception_1.ContainerElementNotFoundException(key);
        }
        return value;
    }
    initialize(classEntry) {
        if (Reflect.getMetadata(injectable_decorator_1.REFLECT_INJECTABLE, classEntry.getValue())) {
            const params = classEntry.getConstructorParams();
            const types = classEntry.getConstructorParams();
            const args = [];
            for (const paramIndex in params) {
                const paramValue = this.resolve(types[paramIndex].name);
                if (paramValue == undefined) {
                    throw new container_element_not_found_exception_1.ContainerElementNotFoundException(types[paramIndex].name);
                }
                args.push(paramValue);
            }
            const classValue = classEntry.getValue();
            const instance = new classValue(...args);
            return instance;
        }
        else {
            throw new element_not_declared_as_injectable_exception_1.ElementNotDeclaredAsInjectableException(classEntry.getValue().name);
        }
    }
    addTagDecorator(containerTagDecorator) {
        this.ContainerTagDecorators.push(containerTagDecorator);
    }
}
exports.Container = Container;

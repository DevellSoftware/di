"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.REFLECT_INJECTABLE_PARAMS = exports.REFLECT_INJECTABLE = void 0;
require("reflect-metadata");
exports.REFLECT_INJECTABLE = "container:injectable";
exports.REFLECT_INJECTABLE_PARAMS = "container:injectable:params";
function Injectable() {
    return function (target) {
        const types = Reflect.getMetadata("design:paramtypes", target);
        Reflect.defineMetadata(exports.REFLECT_INJECTABLE, true, target);
        if (types) {
            Reflect.defineMetadata(exports.REFLECT_INJECTABLE_PARAMS, types, target);
        }
    };
}
exports.Injectable = Injectable;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementListener = void 0;
const listener_1 = require("../async/listener");
class ElementListener extends listener_1.Listener {
    name;
    callback;
    typeName = "element-listener";
    constructor(name, callback) {
        super();
        this.name = name;
        this.callback = callback;
    }
    getName() {
        return this.name;
    }
    getCallback() {
        return this.callback;
    }
    trigger(element) {
        this.callback(element);
    }
}
exports.ElementListener = ElementListener;

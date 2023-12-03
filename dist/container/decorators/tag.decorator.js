"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.REFLECT_TAG = void 0;
const container_tag_1 = require("../tag/container-tag");
require("reflect-metadata");
exports.REFLECT_TAG = "container:tag";
function Tag(name) {
    return function (target) {
        const containerTag = new container_tag_1.ContainerTag(name);
        const tags = Reflect.getMetadata(exports.REFLECT_TAG, target) || [];
        tags.push(containerTag);
        Reflect.defineMetadata(exports.REFLECT_TAG, tags, target);
    };
}
exports.Tag = Tag;

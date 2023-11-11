import { ContainerTag } from "@container/tag/container-tag";
import "reflect-metadata";

export const REFLECT_TAG = "container:tag";

export function Tag(name: string) {
  return function (target: any) {
    const containerTag = new ContainerTag(name);

    const tags = Reflect.getMetadata(REFLECT_TAG, target) || [];

    tags.push(containerTag);

    Reflect.defineMetadata(REFLECT_TAG, tags, target);
  };
}

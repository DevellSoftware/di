import {
  REFLECT_INJECTABLE,
  REFLECT_INJECTABLE_PARAMS,
} from "@container/decorators/injectable.decorator";
import { ClassType, Entry, EntryType } from "@container/entry/entry";
import { ElementNotDeclaredAsInjectableException } from "@container/exception/element-not-declared-as-injectable.exception";
import "reflect-metadata";

export class ClassEntry extends Entry {
  typeName: EntryType = "class";
  private value: ClassType;

  constructor(value: ClassType) {
    super();

    this.value = value;
  }

  getValue(): ClassType {
    return this.value;
  }

  public static isClass(target: any): boolean {
    function isClass(target: any): target is { new (...args: any[]): any } {
      return (
        typeof target === "function" &&
        /^\s*class\s+/.test(target.toString()) &&
        Object.getOwnPropertyDescriptor(target, "prototype") != undefined
      );
    }

    const isAClass = isClass(target) as boolean;

    return isAClass;
  }

  public getConstructorParams(): { [key: string]: any } {
    if (!this.value) {
      throw new Error("Missconfigured class entry");
    }

    const injectable: boolean = Reflect.getMetadata(
      REFLECT_INJECTABLE,
      this.value
    );

    if (!injectable) {
      throw new ElementNotDeclaredAsInjectableException(this.value.name);
    }

    const constructorLine = this.value.prototype.constructor
      .toString()
      .split("\n")
      .find((line: string) => {
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
      .map((param: string) => {
        return param.trim();
      });

    if (params) {
      return {};
    }

    const types = Reflect.getMetadata(
      REFLECT_INJECTABLE_PARAMS,
      this.value.prototype.constructor
    );

    const paramsWithTypes: { [key: string]: any } = {};

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

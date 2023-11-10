import { ClassType, Entry, EntryType } from "@container/entry/entry";

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

  static isClass(target: any): target is ClassType {
    return !(
      target &&
      typeof target === "object" &&
      /^(object|array)$/i.test(target.constructor.name) === false
    );
  }

  public getConstructorParams(): string[] {
    console.log(this.value.prototype.constructor.toString());
    /*  const params = this.value.constructor
      .toString()
      .match(
        /constructor\s*\(\s*((\w+)\s*:\s*(\w+)(\s*,\s*(\w+\s*:\s*\w+))*)\s*\)/
      );
*/
    const params = this.value.constructor
      .toString()
      .match(/function[^(]*\(([^)]*)\)/);

    console.log("PARAMS", params);

    if (!params) {
      return [];
    }

    return params[1].split(",").map((param: string) => param.trim());
  }
}

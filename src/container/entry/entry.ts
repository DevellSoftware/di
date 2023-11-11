export type EntryType = "class" | "object" | "function" | "factory";
export type ClassType = { new (...args: any[]): any };
export type EntryValue = Function | object | ClassType;

export abstract class Entry {
  typeName: EntryType;

  getValue(): EntryValue {
    throw new Error("GetValue method is not implemented");
  }
}

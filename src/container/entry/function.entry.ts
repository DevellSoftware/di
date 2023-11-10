import { Entry, EntryType } from "@container/entry/entry";

export class FunctionEntry extends Entry {
  typeName: EntryType = "function";
  private value: Function;

  constructor(value: Function) {
    super();

    this.value = value;
  }

  getValue(): Function {
    return this.value;
  }
}

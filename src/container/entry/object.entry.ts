import { Entry, EntryType } from "@container/entry/entry";

export class ObjectEntry extends Entry {
  typeName: EntryType = "object";
  private value: object;

  constructor(value: object) {
    super();

    this.value = value;
  }

  getValue(): object {
    return this.value;
  }
}

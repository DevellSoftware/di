import { Container } from "@container/container";
import { Entry, EntryType } from "@container/entry/entry";

export type FactoryMethod = (container: Container) => object;

export class FactoryEntry extends Entry {
  typeName: EntryType = "factory";

  constructor(private factoryMethod: FactoryMethod) {
    super();
  }

  getValue(): Function {
    return this.factoryMethod;
  }

  create<T = object>(container: Container): T {
    return this.factoryMethod(container) as T;
  }
}

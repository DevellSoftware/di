import { ClassEntry } from "@container/entry/class.entry";
import { Entry, EntryValue, ClassType } from "@container/entry/entry";
import { FunctionEntry } from "@container/entry/function.entry";
import { ObjectEntry } from "@container/entry/object.entry";
import { ContainerKey } from "@container/key/container-key";

export class Container {
  private entries: Map<ContainerKey, Entry> = new Map();

  public register(key: ContainerKey, value: EntryValue) {
    if (ClassEntry.isClass(value)) {
      this.entries.set(key, new ClassEntry(value as ClassType));
      return;
    }

    if (typeof value === "function") {
      this.entries.set(key, new FunctionEntry(value));
      return;
    }

    if (typeof value === "object") {
      this.entries.set(key, new ObjectEntry(value));
      return;
    }
  }

  public resolve<T = any>(key: ContainerKey): T {
    const entry = this.entries.get(key);

    if (entry == undefined) {
      throw new Error(`${key} is not registered`);
    }

    if (ClassEntry.isClass(entry.getValue())) {
      let classEntry = entry as unknown as ClassEntry;
      return this.initialize(classEntry) as T;
    }

    if (!entry) {
      throw new Error(`Could not resolve ${key}`);
    }

    return entry.getValue() as T;
  }

  private initialize<T = any>(classEntry: ClassEntry) {}
}

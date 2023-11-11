import { ElementListener } from "@container/async/element-listener";
import { REFLECT_INJECTABLE } from "@container/decorators/injectable.decorator";
import { ClassEntry } from "@container/entry/class.entry";
import { Entry, EntryValue, ClassType } from "@container/entry/entry";
import { FunctionEntry } from "@container/entry/function.entry";
import { ObjectEntry } from "@container/entry/object.entry";
import { ContainerElementNotFoundException } from "@container/exception/container-element-not-found.exception";
import { ElementNotDeclaredAsInjectableException } from "@container/exception/element-not-declared-as-injectable.exception";
import { ContainerKey } from "@container/key/container-key";

export class Container {
  private entries: Map<ContainerKey, Entry> = new Map();

  public register(key: ContainerKey, value: EntryValue) {
    if (ClassEntry.isClass(value)) {
      this.entries.set(key, new ClassEntry(value as ClassType));
    } else if (typeof value === "function") {
      this.entries.set(key, new FunctionEntry(value));
    } else if (typeof value === "object") {
      this.entries.set(key, new ObjectEntry(value));
    }
  }

  public resolve<T = any>(key: ContainerKey): T {
    const entry = this.entries.get(key);
    let value: T | null = null;

    if (entry == undefined) {
      throw new ContainerElementNotFoundException(key);
    }

    if (ClassEntry.isClass(entry.getValue())) {
      let classEntry = entry as unknown as ClassEntry;
      value = this.initialize(classEntry) as T;
    } else if (entry.typeName === "function") {
      value = entry.getValue() as T;
    } else if (entry.typeName === "object") {
      value = entry.getValue() as T;
    }

    if (!value) {
      throw new ContainerElementNotFoundException(key);
    }

    return value as T;
  }

  private initialize<T = any>(classEntry: ClassEntry) {
    if (Reflect.getMetadata(REFLECT_INJECTABLE, classEntry.getValue())) {
      const params = classEntry.getConstructorParams();
      const types = classEntry.getConstructorParams();

      const args = [];

      for (const paramIndex in params) {
        const paramValue = this.resolve(types[paramIndex].name);

        if (paramValue == undefined) {
          throw new ContainerElementNotFoundException(types[paramIndex].name);
        }

        args.push(paramValue);
      }

      const classValue = classEntry.getValue();

      const instance = new classValue(...args) as T;

      return instance;
    } else {
      throw new ElementNotDeclaredAsInjectableException(
        classEntry.getValue().name
      );
    }
  }
}

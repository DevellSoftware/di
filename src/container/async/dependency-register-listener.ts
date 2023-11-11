import { Listener } from "@container/async/listener";
import { ClassEntry } from "@container/entry/class.entry";
import { Entry } from "@container/entry/entry";
import { ContainerKey } from "@container/key/container-key";

export class DependencyRegisterListener extends Listener {
  typeName: string = "dependency-register-listener";

  private registeredAlready: ContainerKey[] = [];

  constructor(
    public name: string,
    private dependencies: ContainerKey[],
    private entry: ClassEntry,
    private onAllDepsRegistered: (object: any) => void
  ) {
    super();
  }

  trigger(entry: Entry) {
    let found = false;

    const entryValue = entry.getValue();

    const constructorParams = this.entry.getConstructorParams();

    for (const [paramName, paramType] of Object.entries(constructorParams)) {
      if (paramType == entry.getValue().constructor.name) {
        this.registeredAlready.push(paramName);
      }
    }

    if (this.registeredAlready.length === this.dependencies.length) {
      this.onAllDepsRegistered(entryValue);
    }
  }
}

import { Listener } from "@container/async/listener";

export class ElementListener extends Listener {
  typeName: string = "element-listener";

  constructor(public name: string, private callback: (element: any) => void) {
    super();
  }

  getName(): string {
    return this.name;
  }

  getCallback(): Function {
    return this.callback;
  }

  trigger(element: any) {
    this.callback(element);
  }
}

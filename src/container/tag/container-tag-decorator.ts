import { Container } from "@container/container";

export type Decorator = (container: Container, target: any) => any;

export class ContainerTagDecorator {
  constructor(public name: string, public decorator: Decorator) {}
}

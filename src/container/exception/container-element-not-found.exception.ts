export class ContainerElementNotFoundException extends Error {
  constructor(containerKey: string) {
    super(`Container element not found: ${containerKey}`);
  }
}

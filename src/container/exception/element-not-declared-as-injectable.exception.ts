export class ElementNotDeclaredAsInjectableException extends Error {
  constructor(name: string) {
    super(`Element ${name} with name ${name} is not declared as injectable.`);
  }
}

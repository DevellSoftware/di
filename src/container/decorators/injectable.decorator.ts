import "reflect-metadata";

export const REFLECT_INJECTABLE = "container:injectable";
export const REFLECT_INJECTABLE_PARAMS = "container:injectable:params";

export function Injectable() {
  return function (target: any) {
    const types = Reflect.getMetadata("design:paramtypes", target);

    Reflect.defineMetadata(REFLECT_INJECTABLE, true, target);

    if (types) {
      Reflect.defineMetadata(REFLECT_INJECTABLE_PARAMS, types, target);
    }
  };
}

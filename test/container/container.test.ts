import { Container } from "@container/container";
import { FactoryMethod } from "@container/entry/factory.entry";
import { Bar } from "@foo/bar";
import { Biz } from "@foo/biz";
import { Zap } from "@foo/zap";

describe("container", () => {
  const container = new Container();

  it("should resolve dependency", () => {
    container.register("foo", () => "bar");

    const entry = container.resolve<Function>("foo");

    expect(entry()).toBe("bar");
  });

  it("should resolve class dependency", () => {
    container.register("bar", Bar);
    container.register("zap", Zap);

    container.register("biz", Biz);

    const biz = container.resolve<Biz>("biz");

    expect(biz).toBeInstanceOf(Biz);
  });

  it("should let create instance from factory", () => {
    container.register("bar", Bar);
    container.register("zap", Zap);

    container.register("bizFactory", (container: Container) => {
      return new Biz(
        container.resolve<Bar>("bar"),
        container.resolve<Zap>("zap")
      );
    });

    const biz = container.resolve<FactoryMethod>("bizFactory");

    expect(biz(container)).toBeInstanceOf(Biz);
  });
});

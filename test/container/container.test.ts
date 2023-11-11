import { Container } from "@container/container";
import { Injectable } from "@container/decorators/injectable.decorator";
import { Tag } from "@container/decorators/tag.decorator";
import { FactoryMethod } from "@container/entry/factory.entry";
import { ContainerTagDecorator } from "@container/tag/container-tag-decorator";
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

  it("should recognize tags and decorators", () => {
    @Tag("foo")
    @Injectable()
    class Doo {
      changeThis = "foo";
    }

    container.addTagDecorator(
      new ContainerTagDecorator("foo", (container, target) => {
        return class extends target {
          changeThis = "bar";
        };
      })
    );

    container.register("doo", Doo);

    const dooValue = container.resolve<Doo>("doo");

    console.log(dooValue);

    expect(dooValue.changeThis).toBe("bar");
  });
});

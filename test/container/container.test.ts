import { Container } from "@container/container";

describe("container", () => {
  const container = new Container();

  xit("should resolve dependency", () => {
    container.register("foo", () => "bar");
    expect(container.resolve("foo")()).toBe("bar");
  });

  it("should resolve class dependency", () => {
    class Zip {
      public zap() {
        return "zap";
      }
    }

    class Foo {
      constructor(private zip: Zip) {}

      public zap() {
        this.zip.zap();
      }
    }

    container.register("foo", Foo);
    expect(container.resolve<Foo>("foo").zap()).toBe("zap");
  });
});

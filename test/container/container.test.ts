import { Container } from "@container/container";
import { Bar } from "@foo/bar";
import { Biz } from "@foo/biz";

describe("container", () => {
  const container = new Container();

  xit("should resolve dependency", () => {
    container.register("foo", () => "bar");
    expect(container.resolve("foo")()).toBe("bar");
  });

  it("should resolve class dependency", () => {
    container.register("bar", Bar);
    container.register("biz", Biz);

    const biz = container.resolve<Biz>("biz");

    expect(biz).toBeInstanceOf(Biz);
  });
});

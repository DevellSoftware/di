# Devell Depenency Injection Container Library

## What is this?

This is another library for typescript, written to be as easy to use as possible.

The first thing to do when using it is to create a `Container` class instance.

## Show me the code

```
import { Container } from "@container/container";
import { Logger } from "@logger/logger";
import { Injectable } from "@container/decorators/injectable";

const container = new Container();

container.register("logger", Logger);

@Injectable()
class InvoiceRegistry {
    constructor(public logger: Logger) {}
}

container.register("invoice-registry", InvoiceRegistry);

const invoiceRegistry = container.resolve("invoice-registry");
invoiceRegistry.logger.log("It is working.");

```

## Current state

For now there is a requirement to add `@Injectable()` decorator to the class
that we want to have autowired.

This is a very early version and a lot will be added.

Contributions are very welcome

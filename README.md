# 📦 Devell Dependency Injection Library

## What is this?

This is another library for typescript, written to be as easy to use as possible.

It has (or will have) possibilities that should improve your programming experience vastly,
but gathering all the best solutions I learned on my software development journey, and decide
to filter, simplify, and pack into one `simple API` library.

The first thing to do when using it is to create a `Container` class instance.

Then there will come a series of packages that I want to use to stand out for my commercial
customers.

<p align="center">
    <img src="https://github.com/DevellSoftware/di/assets/1759853/43d2b4b4-f079-4f27-82ef-689e33f1b589">
</p>

## Show me the code

This is just the simplest snippet:

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

For now, there is a requirement to add a `@Injectable()` decorator to the class
that we want to have autowired.

This is a very early version and a lot will be added.

I'm planning to incorporate the Typescript Compiler API.

## Change log

#### 0.0.1

- Base container setup
- Autowiring
- Support for classes, functions, and objects

### 0.0.2

- Minor fixes in tests

#### 0.0.3

- Exporting decoratora bug fixed

#### 0.0.4

- Added declaration file entry in tsconfig.json and package.json

#### 0.0.5

- Removed console logs from tests

#### 0.0.6

- Updated the readme

###### Plans for 1.0.0

- Remove the need for an injectable decorator
- Use Typescript API for achieving more flexibility
- Finish tags (fix the decorated data clearance)

## What if I want to join?

Contributions are very welcome, it would be an honor for me.

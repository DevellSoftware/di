import { ClassType, Entry, EntryType } from "@container/entry/entry";
import { Project, StructureKind, ts } from "ts-morph";
import * as path from "path";
import { ConstructorDeclaration } from "typescript";

export class ClassEntry extends Entry {
  typeName: EntryType = "class";
  private value: ClassType;
  static project: Project;

  private classDeclaration: any;

  constructor(value: ClassType) {
    super();

    this.value = value;

    if (ClassEntry.project == undefined) {
      ClassEntry.project = new Project({
        tsConfigFilePath: path.join(
          __dirname,
          "..",
          "..",
          "..",
          "tsconfig.json"
        ),
      });
      ClassEntry.project.addSourceFilesAtPaths("src/**/*.ts");
    }

    ClassEntry.project.getSourceFiles().forEach((sourceFile) => {
      sourceFile.getClasses().forEach((classDeclaration) => {
        const constructor = classDeclaration
          .getConstructors()
          .forEach((constructor) => {
            const constValue = ClassEntry.project.getSourceFileOrThrow(
              constructor.getSourceFile().getFilePath()
            );

            constValue.get;
          });
      });
    });
  }

  getValue(): ClassType {
    return this.value;
  }

  public static isClass(target: any): target is ClassType {
    return !(
      target &&
      typeof target === "object" &&
      /^(object|array)$/i.test(target.constructor.name) === false
    );
  }

  public getConstructorParams(): string[] {
    console.log(this.value.prototype.constructor.toString());
    /*  const params = this.value.constructor
      .toString()
      .match(
        /constructor\s*\(\s*((\w+)\s*:\s*(\w+)(\s*,\s*(\w+\s*:\s*\w+))*)\s*\)/
      );
*/
    const params = this.value.constructor
      .toString()
      .match(/function[^(]*\(([^)]*)\)/);

    console.log("PARAMS", params);

    if (!params) {
      return [];
    }

    return params[1].split(",").map((param: string) => param.trim());
  }
}

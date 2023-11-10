export type EntryType = "class" | "object" | "function";

export abstract class Entry {
  typeName: EntryType;
}

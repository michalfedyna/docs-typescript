import { PageBuilder } from "../documenter/PageBuilder";

enum Sections {
  Header = "header",
  Remarks = "remarks",
  Example = "example",
  Properties = "properties",
  Methods = "methods",
}

abstract class Emitter {
  abstract emit(page: PageBuilder): string;
}

export { Emitter, Sections };

import { Hierarchy } from "../hierarchy/Hierarchy";

enum Sections {
	Header = "header",
	Remarks = "remarks",
	Example = "example",
	Properties = "properties",
	Methods = "methods"
}

abstract class Emitter {
	abstract emit(hierarchy: Hierarchy): void;
}

export { Emitter, Sections };

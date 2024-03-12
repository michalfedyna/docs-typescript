enum Sections {
	Header = "header",
	Remarks = "remarks",
	Example = "example",
	Properties = "properties",
	Methods = "methods"
}

abstract class Emitter {
	abstract emit(): void;
}

export { Emitter, Sections };

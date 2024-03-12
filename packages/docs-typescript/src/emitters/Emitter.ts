import { DocsConfig } from "../config/DocsConfig";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";

enum Sections {
	Header = "header",
	Remarks = "remarks",
	Example = "example",
	Properties = "properties",
	Methods = "methods"
}

interface Page {
	url: string;
	content: string;
}

abstract class Emitter {
	constructor(protected readonly _config: DocsConfig) {}

	abstract emit(items: HierarchyItem[]): void;

	abstract page(item: HierarchyItem): { url: string; content: string };
}

export { Emitter, Sections };

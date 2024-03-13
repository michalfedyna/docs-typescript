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

	abstract emit(item: HierarchyItem): void;

	protected abstract _emitPage(item: HierarchyItem): void;

	protected abstract _toFile(content: string, url: string): void;
}

export { Emitter, Sections };

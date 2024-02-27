import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface InterfaceAttributes {
	displayName: string;
	fileUrlPath?: string;
	extendsTypes: string[];
	typeParameters: { name: string; isOptional: boolean; constraint: string; default: string }[];
}

class InterfaceItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.InterfaceItem;
	protected _attributes: InterfaceAttributes;
	protected _docs: DocsItem;

	constructor(attributes: InterfaceAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}
}

export { InterfaceItem, InterfaceAttributes };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface NamespaceAttributes {
	displayName: string;
	fileUrlPath?: string;
}

class NamespaceItem extends HierarchyItem {
	protected _type = HierarchyItemType.NamespaceItem;
	protected _attributes: NamespaceAttributes;
	protected _docs: DocsItem;

	constructor(attributes: NamespaceAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}
}

export { NamespaceItem, NamespaceAttributes };

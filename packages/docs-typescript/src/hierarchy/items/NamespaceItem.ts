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

	public get attributes(): NamespaceAttributes {
		return this._attributes;
	}

	public get docs(): DocsItem {
		return this._docs;
	}

	public toObject(): object {
		return {
			...super.toObject(),
			attributes: this._attributes,
			docs: this._docs.toObject()
		};
	}
}

export { NamespaceItem, NamespaceAttributes };

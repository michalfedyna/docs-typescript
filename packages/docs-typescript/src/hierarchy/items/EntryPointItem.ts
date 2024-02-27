import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface EntryPointAttributes {
	displayName: string;
}

class EntryPointItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.EntryPointItem;
	protected _attributes: EntryPointAttributes;
	protected _docs: DocsItem;

	constructor(attributes: EntryPointAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): EntryPointAttributes {
		return this._attributes;
	}

	public get docs(): DocsItem {
		return this._docs;
	}

	public toObject(): object {
		return {
			...super.toObject(),
			attributes: this._attributes
		};
	}
}

export { EntryPointItem, EntryPointAttributes };

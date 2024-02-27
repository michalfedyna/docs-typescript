import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface EnumAttributes {
	displayName: string;
	fileUrlPath?: string;
	members: { name: string }[];
}

class EnumItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.EnumItem;
	protected _attributes: EnumAttributes;
	protected _docs: DocsItem;

	constructor(attributes: EnumAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): EnumAttributes {
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

export { EnumItem, EnumAttributes };

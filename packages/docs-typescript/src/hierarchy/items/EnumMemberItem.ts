import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface EnumMemberAttributes {
	displayName: string;
	fileUrlPath?: string;
}

class EnumMemberItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.EnumMemberItem;
	protected _attributes: EnumMemberAttributes;
	protected _docs: DocsItem;

	constructor(attributes: EnumMemberAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): EnumMemberAttributes {
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

export { EnumMemberItem, EnumMemberAttributes };

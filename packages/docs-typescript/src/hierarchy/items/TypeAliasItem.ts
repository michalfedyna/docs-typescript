import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface TypeAliasAttributes {
	displayName: string;
	fileUrlPath?: string;
	type: string;
	typeParameters: { name: string; isOptional: boolean; constraint: string; default: string }[];
}

class TypeAliasItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.TypeAliasItem;
	protected _attributes: TypeAliasAttributes;
	protected _docs: DocsItem;

	constructor(attributes: TypeAliasAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): TypeAliasAttributes {
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

export { TypeAliasItem, TypeAliasAttributes };

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

	public get attributes(): InterfaceAttributes {
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

export { InterfaceItem, InterfaceAttributes };

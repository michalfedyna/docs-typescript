import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface PropertySignatureAttributes {
	displayName: string;
	fileUrlPath?: string;
	isEventProperty: boolean;
	isOptional: boolean;
	isReadonly: boolean;
	type: string;
}

class PropertySignatureItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.PropertySignatureItem;
	protected _attributes: PropertySignatureAttributes;
	protected _docs: DocsItem;

	constructor(attributes: PropertySignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): PropertySignatureAttributes {
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

export { PropertySignatureItem, PropertySignatureAttributes };

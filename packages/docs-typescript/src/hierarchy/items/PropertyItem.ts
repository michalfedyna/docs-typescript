import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface PropertyAttributes {
	displayName: string;
	fileUrlPath?: string;
	isAbstract: boolean;
	isEventProperty: boolean;
	isOptional: boolean;
	isProtected: boolean;
	isReadonly: boolean;
	isStatic: boolean;
	type: string;
}

class PropertyItem extends HierarchyItem {
	protected _type = HierarchyItemType.PropertyItem;
	protected _attributes: PropertyAttributes;
	protected _docs: DocsItem;

	constructor(attributes: PropertyAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): PropertyAttributes {
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

export { PropertyItem, PropertyAttributes };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface VariableAttributes {
	displayName: string;
	fileUrlPath?: string;
	type: string;
}

class VariableItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.VariableItem;
	protected _attributes: VariableAttributes;
	protected _docs: DocsItem;

	public constructor(attributes: VariableAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): VariableAttributes {
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

export { VariableItem, VariableAttributes };

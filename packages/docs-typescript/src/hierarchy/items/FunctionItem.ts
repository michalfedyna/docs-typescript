import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface FunctionAttributes {
	displayName: string;
	fileUrlPath?: string;
	overloadIndex: number;
	parameters: { name: string; type: string; isOptional: boolean }[];
	returnType: string;
	typeParameters: { name: string; isOptional: boolean; constraint: string; default: string }[];
}

class FunctionItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.FunctionItem;
	protected _attributes: FunctionAttributes;
	protected _docs: DocsItem;

	constructor(attributes: FunctionAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): FunctionAttributes {
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

export { FunctionItem, FunctionAttributes };

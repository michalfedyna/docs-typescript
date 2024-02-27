import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface MethodSignatureAttributes {
	displayName: string;
	fileUrlPath?: string;
	isOptional: boolean;
	returnType: string;
	overloadIndex: number;
	parameters: { name: string; type: string; isOptional: boolean }[];
	typeParameters: { name: string; isOptional: boolean; constraint: string; default: string }[];
}

class MethodSignatureItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.MethodSignatureItem;
	protected _attributes: MethodSignatureAttributes;
	protected _docs: DocsItem;

	constructor(attributes: MethodSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): MethodSignatureAttributes {
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

export { MethodSignatureItem, MethodSignatureAttributes };

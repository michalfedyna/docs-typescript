import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface ConstructorSignatureAttributes {
	displayName: string;
	returnType: string;
	overloadIndex: number;
	fileUrlPath?: string;
	parameters: { name: string; type: string; isOptional: boolean }[];
}

class ConstructorSignatureItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.ConstructorSignatureItem;
	protected _attributes: ConstructorSignatureAttributes;
	protected _docs: DocsItem;

	constructor(attributes: ConstructorSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	get attributes(): ConstructorSignatureAttributes {
		return this._attributes;
	}

	get docs(): DocsItem {
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

export { ConstructorSignatureItem, ConstructorSignatureAttributes };

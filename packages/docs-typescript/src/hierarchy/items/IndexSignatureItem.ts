import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface IndexSignatureAttributes {
	displayName: string;
	fileUrlPath?: string;
	parameters: { name: string; type: string; isOptional: boolean }[];
	isReadonly: boolean;
	overloadIndex: number;
	returnType: string;
}

class IndexSignatureItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.IndexSignatureItem;
	protected _attributes: IndexSignatureAttributes;
	protected _docs: DocsItem;

	constructor(attributes: IndexSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): IndexSignatureAttributes {
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

export { IndexSignatureItem, IndexSignatureAttributes };

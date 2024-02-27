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
}

export { ConstructorSignatureItem, ConstructorSignatureAttributes };

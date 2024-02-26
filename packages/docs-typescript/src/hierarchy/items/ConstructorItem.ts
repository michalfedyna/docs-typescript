import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface ConstructorAttributes {
	displayName: string;
	fileUrlPath?: string;
	overloadIndex: number;
	isProtected: boolean;
	parameters: {
		name: string;
		type: string;
		isOptional: boolean;
	}[];
}

class ConstructorItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.ConstructorItem;
	protected _attributes: ConstructorAttributes;
	protected _docs: DocsItem;

	constructor(attributes: ConstructorAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): ConstructorAttributes {
		return this._attributes;
	}
}

export { ConstructorItem, ConstructorAttributes };

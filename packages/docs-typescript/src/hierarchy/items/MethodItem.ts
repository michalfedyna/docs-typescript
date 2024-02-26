import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface MethodAttributes {
	displayName: string;
	fileUrlPath?: string;
	isAbstract: boolean;
	isOptional: boolean;
	isProtected: boolean;
	isStatic: boolean;
	overloadIndex: number;
	returnType: string;
	parameters: {
		name: string;
		type: string;
		isOptional: boolean;
	}[];
}

class MethodItem extends HierarchyItem {
	protected _type = HierarchyItemType.MethodItem;
	protected _attributes: MethodAttributes;
	protected _docs: DocsItem;

	constructor(attributes: MethodAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): MethodAttributes {
		return this._attributes;
	}

	public get docs(): DocsItem {
		return this._docs;
	}
}

export { MethodItem, MethodAttributes };

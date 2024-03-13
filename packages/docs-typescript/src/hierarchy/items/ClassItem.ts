import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface ClassAttributes {
	displayName: string;
	signature: string;
	extendsType?: string;
	implementedTypes: string[];
	isAbstract: boolean;
	fileUrlPath?: string;
}

class ClassItem extends HierarchyItem {
	protected _type: HierarchyItemType = HierarchyItemType.ClassItem;
	protected _attributes: ClassAttributes;
	protected _docs: DocsItem;

	constructor(attributes: ClassAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): ClassAttributes {
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

export { ClassItem, ClassAttributes };

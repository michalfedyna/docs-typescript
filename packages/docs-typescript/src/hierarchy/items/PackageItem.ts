import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";

interface PackageAttributes {
	displayName: string;
}

class PackageItem extends HierarchyItem {
	protected _type = HierarchyItemType.PackageItem;
	protected _attributes: PackageAttributes;
	protected _docs: DocsItem;

	constructor(attributes: PackageAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.displayName, parent);
		this._attributes = attributes;
		this._docs = docs;
	}

	public get attributes(): PackageAttributes {
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

export { PackageItem, PackageAttributes };

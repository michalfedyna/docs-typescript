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
}

export { PackageItem, PackageAttributes };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Name } from "./Attributes";

interface PackageAttributes extends Name {}

class PackageItem extends HierarchyItem {
	public type = HierarchyItemType.PackageItem;
	public attributes: PackageAttributes;
	public docs: DocsItem;

	constructor(attributes: PackageAttributes, docs: DocsItem, parent?: HierarchyItem) {
		super(attributes.name, parent);

		this.attributes = attributes;
		this.docs = docs;
	}

	public toObject(): object {
		return {
			...super.toObject(),
			attributes: this.attributes,
			docs: this.docs.toObject()
		};
	}
}

export { PackageItem, PackageAttributes };

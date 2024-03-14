import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { FileUrl, Name, Signature, Parameters, Overload, Protected, ReleaseTag } from "./Attributes";

interface ConstructorAttributes extends Name, ReleaseTag, Signature, FileUrl, Overload, Protected, Parameters {}

class ConstructorItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.ConstructorItem;
	public attributes: ConstructorAttributes;
	public docs: DocsItem;

	constructor(attributes: ConstructorAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { ConstructorItem, ConstructorAttributes };

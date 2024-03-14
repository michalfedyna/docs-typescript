import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Exported, FileUrl, Members, Name, ReleaseTag, Signature } from "./Attributes";

interface EnumAttributes extends Name, ReleaseTag, Signature, Exported, FileUrl, Members {}

class EnumItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.EnumItem;
	public attributes: EnumAttributes;
	public docs: DocsItem;

	constructor(attributes: EnumAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { EnumItem, EnumAttributes };

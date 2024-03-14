import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { FileUrl, Name, ReleaseTag, Signature } from "./Attributes";

interface EnumMemberAttributes extends Name, FileUrl, Signature, ReleaseTag {}

class EnumMemberItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.EnumMemberItem;
	public attributes: EnumMemberAttributes;
	public docs: DocsItem;

	constructor(attributes: EnumMemberAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { EnumMemberItem, EnumMemberAttributes };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Exported, FileUrl, Name, ReleaseTag, Signature } from "./Attributes";

interface NamespaceAttributes extends Name, Signature, Exported, ReleaseTag, FileUrl {}

class NamespaceItem extends HierarchyItem {
	public type = HierarchyItemType.NamespaceItem;
	public attributes: NamespaceAttributes;
	public docs: DocsItem;

	constructor(attributes: NamespaceAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { NamespaceItem, NamespaceAttributes };

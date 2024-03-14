import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Exported, ExtendsArray, FileUrl, Name, ReleaseTag, Signature, TypeParameters } from "./Attributes";

interface InterfaceAttributes extends Name, ReleaseTag, Signature, FileUrl, ExtendsArray, TypeParameters, Exported {}

class InterfaceItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.InterfaceItem;
	public attributes: InterfaceAttributes;
	public docs: DocsItem;

	constructor(attributes: InterfaceAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { InterfaceItem, InterfaceAttributes };

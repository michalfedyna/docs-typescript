import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Exported, FileUrl, Initializer, Name, Readonly, ReleaseTag, Signature, Type } from "./Attributes";

interface VariableAttributes extends Name, Signature, Exported, Readonly, Initializer, ReleaseTag, Type, FileUrl {}

class VariableItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.VariableItem;
	public attributes: VariableAttributes;
	public docs: DocsItem;

	public constructor(attributes: VariableAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { VariableItem, VariableAttributes };

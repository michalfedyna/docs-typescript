import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Name, Signature, ReleaseTag, Type, TypeParameters, FileUrl, Exported } from "./Attributes";

interface TypeAliasAttributes extends Name, Signature, ReleaseTag, Type, TypeParameters, FileUrl, Exported {}

class TypeAliasItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.TypeAliasItem;
	public attributes: TypeAliasAttributes;
	public docs: DocsItem;

	constructor(attributes: TypeAliasAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { TypeAliasItem, TypeAliasAttributes };

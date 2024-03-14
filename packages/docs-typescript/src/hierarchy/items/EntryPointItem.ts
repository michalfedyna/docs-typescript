import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { Name } from "./Attributes";

interface EntryPointAttributes extends Name {}

class EntryPointItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.EntryPointItem;
	public attributes: EntryPointAttributes;
	public docs: DocsItem;

	constructor(attributes: EntryPointAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { EntryPointItem, EntryPointAttributes };

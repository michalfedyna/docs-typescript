import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import {
	Abstract,
	Exported,
	Extends,
	FileUrl,
	Implements,
	Name,
	ReleaseTag,
	Signature,
	TypeParameters
} from "./Attributes";
import { DocsItem } from "../docs/DocsItem";

interface ClassAttributes
	extends Name,
		ReleaseTag,
		Signature,
		Abstract,
		Implements,
		Extends,
		TypeParameters,
		Exported,
		FileUrl {}

class ClassItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.ClassItem;
	public attributes: ClassAttributes;
	public docs: DocsItem;

	constructor(attributes: ClassAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { ClassItem, ClassAttributes };

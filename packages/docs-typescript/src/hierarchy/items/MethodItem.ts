import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import {
	Abstract,
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	Protected,
	ReleaseTag,
	Returns,
	Signature,
	Static
} from "./Attributes";

interface MethodAttributes
	extends Name,
		ReleaseTag,
		FileUrl,
		Signature,
		Abstract,
		Optional,
		Static,
		Protected,
		Overload,
		Returns,
		Parameters {}

class MethodItem extends HierarchyItem {
	public type = HierarchyItemType.MethodItem;
	public attributes: MethodAttributes;
	public docs: DocsItem;

	constructor(attributes: MethodAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { MethodItem, MethodAttributes };

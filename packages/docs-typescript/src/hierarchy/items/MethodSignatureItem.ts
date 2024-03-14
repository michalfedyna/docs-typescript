import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import {
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./Attributes";

interface MethodSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		FileUrl,
		Optional,
		Returns,
		Overload,
		Parameters,
		TypeParameters {}

class MethodSignatureItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.MethodSignatureItem;
	public attributes: MethodSignatureAttributes;
	public docs: DocsItem;

	constructor(attributes: MethodSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { MethodSignatureItem, MethodSignatureAttributes };

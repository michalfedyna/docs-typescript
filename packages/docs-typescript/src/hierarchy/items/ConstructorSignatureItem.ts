import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { FileUrl, Name, Overload, Signature, Parameters, Returns, TypeParameters, ReleaseTag } from "./Attributes";

interface ConstructorSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Overload,
		FileUrl,
		Parameters,
		TypeParameters,
		Returns {}

class ConstructorSignatureItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.ConstructorSignatureItem;
	public attributes: ConstructorSignatureAttributes;
	public docs: DocsItem;

	constructor(attributes: ConstructorSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { ConstructorSignatureItem, ConstructorSignatureAttributes };

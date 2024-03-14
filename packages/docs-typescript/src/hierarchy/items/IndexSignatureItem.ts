import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { FileUrl, Name, Overload, Parameters, Readonly, ReleaseTag, Returns, Signature } from "./Attributes";

interface IndexSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Parameters,
		Overload,
		Returns,
		FileUrl,
		Readonly {}

class IndexSignatureItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.IndexSignatureItem;
	public attributes: IndexSignatureAttributes;
	public docs: DocsItem;

	constructor(attributes: IndexSignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { IndexSignatureItem, IndexSignatureAttributes };

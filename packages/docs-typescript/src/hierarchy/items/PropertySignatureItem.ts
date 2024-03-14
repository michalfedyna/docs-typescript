import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import { EventProperty, FileUrl, Name, Optional, Readonly, ReleaseTag, Signature, Type } from "./Attributes";

interface PropertySignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		FileUrl,
		EventProperty,
		Optional,
		Readonly,
		Type {}

class PropertySignatureItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.PropertySignatureItem;
	public attributes: PropertySignatureAttributes;
	public docs: DocsItem;

	constructor(attributes: PropertySignatureAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { PropertySignatureItem, PropertySignatureAttributes };

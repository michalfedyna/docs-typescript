import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import {
	Abstract,
	EventProperty,
	FileUrl,
	Initializer,
	Name,
	Optional,
	Protected,
	Readonly,
	ReleaseTag,
	Signature,
	Static,
	Type
} from "./Attributes";

interface PropertyAttributes
	extends Name,
		FileUrl,
		Signature,
		ReleaseTag,
		Abstract,
		EventProperty,
		Optional,
		Protected,
		Readonly,
		Static,
		Type,
		Initializer {}

class PropertyItem extends HierarchyItem {
	public type = HierarchyItemType.PropertyItem;
	public attributes: PropertyAttributes;
	public docs: DocsItem;

	constructor(attributes: PropertyAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { PropertyItem, PropertyAttributes };

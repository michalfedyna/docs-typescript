import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { DocsItem } from "../docs/DocsItem";
import {
	Exported,
	FileUrl,
	Name,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./Attributes";

interface FunctionAttributes
	extends Name,
		Signature,
		Exported,
		Overload,
		Parameters,
		Returns,
		TypeParameters,
		ReleaseTag,
		FileUrl {}

class FunctionItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.FunctionItem;
	public attributes: FunctionAttributes;
	public docs: DocsItem;

	constructor(attributes: FunctionAttributes, docs: DocsItem, parent?: HierarchyItem) {
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

export { FunctionItem, FunctionAttributes };

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
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

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

class PropertyNode extends ApiNode<PropertyAttributes> {
	public type: ApiNodeType = ApiNodeType.PropertyNode;
}

export { PropertyNode, PropertyAttributes };

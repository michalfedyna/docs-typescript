import { EventProperty, FileUrl, Name, Optional, Readonly, ReleaseTag, Signature, Type } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface PropertySignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		FileUrl,
		EventProperty,
		Optional,
		Readonly,
		Type {}

class PropertySignatureNode extends ApiNode<PropertySignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.PropertySignatureNode;
}

export { PropertySignatureNode, PropertySignatureAttributes };

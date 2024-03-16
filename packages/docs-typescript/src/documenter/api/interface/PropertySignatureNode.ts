import { EventProperty, FileUrl, Name, Optional, Readonly, ReleaseTag, Signature, Type } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiPropertySignature, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

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

function extractPropertySignatureAttributes(apiPropertySignature: ApiPropertySignature): PropertySignatureAttributes {
	const { displayName, fileUrlPath, isReadonly, isOptional, isEventProperty } = apiPropertySignature;
	const type = apiPropertySignature.propertyTypeExcerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiPropertySignature.releaseTag);
	const signature = apiPropertySignature.excerpt.text;

	return { name: displayName, releaseTag, signature, fileUrlPath, type, isOptional, isReadonly, isEventProperty };
}

export { PropertySignatureNode, PropertySignatureAttributes, extractPropertySignatureAttributes };

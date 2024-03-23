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
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiProperty, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

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

function extractPropertyAttributes(apiProperty: ApiProperty): PropertyAttributes {
	const { displayName, isStatic, isAbstract, isProtected, isReadonly, isOptional, isEventProperty, fileUrlPath } =
		apiProperty;
	const type = apiProperty.propertyTypeExcerpt.text;
	const initializer = apiProperty.initializerExcerpt?.text;
	const releaseTag = ApiReleaseTag.getTagName(apiProperty.releaseTag);

	const signature = `${isProtected ? "protected " : ""}${isStatic ? "static " : ""}${isAbstract ? "abstract " : ""}${isReadonly ? "readonly " : ""}${displayName}${isOptional ? "?" : ""}: ${type}${initializer ? " = " + initializer : ""}`;

	return {
		name: displayName,
		signature,
		releaseTag,
		initializer,
		fileUrlPath,
		isAbstract,
		isEventProperty,
		isOptional,
		isProtected,
		isReadonly,
		isStatic,
		type
	};
}

export { PropertyNode, PropertyAttributes, extractPropertyAttributes };

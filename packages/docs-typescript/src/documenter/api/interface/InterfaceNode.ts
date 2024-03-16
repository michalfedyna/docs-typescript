import { Exported, ExtendsArray, FileUrl, Name, ReleaseTag, Signature, TypeParameters } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiInterface, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface InterfaceAttributes extends Name, ReleaseTag, Signature, FileUrl, ExtendsArray, TypeParameters, Exported {}

class InterfaceNode extends ApiNode<InterfaceAttributes> {
	public type: ApiNodeType = ApiNodeType.InterfaceNode;
}

function extractInterfaceAttributes(apiInterface: ApiInterface): InterfaceAttributes {
	const { displayName, fileUrlPath, isExported } = apiInterface;
	const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);
	const releaseTag = ApiReleaseTag.getTagName(apiInterface.releaseTag);
	const signature = apiInterface.excerpt.text;

	return { name: displayName, fileUrlPath, extendsTypes, isExported, signature, releaseTag, typeParameters };
}

export { InterfaceNode, InterfaceAttributes, extractInterfaceAttributes };

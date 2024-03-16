import { Exported, FileUrl, Name, ReleaseTag, Signature, Type, TypeParameters } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";
import { ApiTypeAlias, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface TypeAliasAttributes extends Name, Signature, ReleaseTag, Type, TypeParameters, FileUrl, Exported {}

class TypeAliasNode extends ApiNode<TypeAliasAttributes> {
	public type: ApiNodeType = ApiNodeType.TypeAliasNode;
}

function extractTypeAliasAttributes(apiTypeAlias: ApiTypeAlias): TypeAliasAttributes {
	const { displayName, fileUrlPath, isExported } = apiTypeAlias;
	const type = apiTypeAlias.typeExcerpt.text;
	const typeParameters = apiTypeAlias.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiTypeAlias.releaseTag);
	const signature = apiTypeAlias.excerpt.text;

	return { name: displayName, fileUrlPath, isExported, releaseTag, signature, type, typeParameters };
}

export { TypeAliasNode, TypeAliasAttributes, extractTypeAliasAttributes };

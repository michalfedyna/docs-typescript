import { DocsExtractor } from "../../DocsExtractor";
import { Docs, Exported, ExtendsArray, FileUrl, Name, ReleaseTag, Signature, TypeParameters } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiInterface, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface InterfaceAttributes
	extends Name,
		Docs,
		ReleaseTag,
		Signature,
		FileUrl,
		ExtendsArray,
		TypeParameters,
		Exported {}

class InterfaceNode extends ApiNode<InterfaceAttributes> {
	public type: ApiNodeType = ApiNodeType.InterfaceNode;
}

function extractInterfaceAttributes(apiInterface: ApiInterface): InterfaceAttributes {
	const { displayName, fileUrlPath, isExported } = apiInterface;
	const docs = DocsExtractor.extract(apiInterface);
	const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);
	const releaseTag = ApiReleaseTag.getTagName(apiInterface.releaseTag);

	const extendsTypesSignature = extendsTypes.length > 0 ? ` extends ${extendsTypes.join(", ")}` : "";

	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);

	const typeParametersSignature = typeParametersArray.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";

	const signature = `interface ${displayName}${typeParametersSignature}${extendsTypesSignature} {}`;

	return { name: displayName, docs, fileUrlPath, extendsTypes, isExported, signature, releaseTag, typeParameters };
}

export { InterfaceNode, InterfaceAttributes, extractInterfaceAttributes };

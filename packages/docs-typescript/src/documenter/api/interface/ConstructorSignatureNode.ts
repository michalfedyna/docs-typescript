import { DocsExtractor } from "../../DocsExtractor";
import {
	Docs,
	FileUrl,
	Name,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiConstructSignature, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface ConstructorSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Overload,
		FileUrl,
		Parameters,
		TypeParameters,
		Returns,
		Docs {}

class ConstructorSignatureNode extends ApiNode<ConstructorSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.ConstructorSignatureNode;
}

function extractConstructorSignatureAttributes(
	apiConstructSignature: ApiConstructSignature
): ConstructorSignatureAttributes {
	const { displayName, fileUrlPath, overloadIndex } = apiConstructSignature;
	const docs = DocsExtractor.extract(apiConstructSignature);
	const returnType = apiConstructSignature.returnTypeExcerpt.text;
	const parameters = apiConstructSignature.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional,
		doc: DocsExtractor.traverse(parameter.tsdocParamBlock)
	}));
	const typeParameters = apiConstructSignature.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text,
		doc: DocsExtractor.traverse(typeParameter.tsdocTypeParamBlock)
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiConstructSignature.releaseTag);

	const signature = apiConstructSignature.excerpt.text;

	return {
		name: displayName,
		docs,
		releaseTag,
		signature,
		fileUrlPath,
		returnType,
		parameters,
		typeParameters,
		overloadIndex
	};
}

export { ConstructorSignatureNode, ConstructorSignatureAttributes, extractConstructorSignatureAttributes };

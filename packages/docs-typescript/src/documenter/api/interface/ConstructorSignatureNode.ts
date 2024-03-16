import { FileUrl, Name, Overload, Parameters, ReleaseTag, Returns, Signature, TypeParameters } from "../ApiAttributes";
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
		Returns {}

class ConstructorSignatureNode extends ApiNode<ConstructorSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.ConstructorSignatureNode;
}

function extractConstructorSignatureAttributes(
	apiConstructSignature: ApiConstructSignature
): ConstructorSignatureAttributes {
	const { displayName, fileUrlPath, overloadIndex } = apiConstructSignature;
	const signature = apiConstructSignature.excerpt.text;
	const returnType = apiConstructSignature.returnTypeExcerpt.text;
	const parameters = apiConstructSignature.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const typeParameters = apiConstructSignature.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiConstructSignature.releaseTag);

	return {
		name: displayName,
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

import {
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiMethodSignature, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface MethodSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		FileUrl,
		Optional,
		Returns,
		Overload,
		Parameters,
		TypeParameters {}

class MethodSignatureNode extends ApiNode<MethodSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.MethodSignatureNode;
}

function extractMethodSignatureAttributes(apiMethodSignature: ApiMethodSignature): MethodSignatureAttributes {
	const { displayName, fileUrlPath, overloadIndex, isOptional } = apiMethodSignature;
	const returnType = apiMethodSignature.returnTypeExcerpt.text;
	const parameters = apiMethodSignature.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const typeParameters = apiMethodSignature.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiMethodSignature.releaseTag);
	const signature = apiMethodSignature.excerpt.text;

	return {
		name: displayName,
		fileUrlPath,
		returnType,
		releaseTag,
		signature,
		parameters,
		typeParameters,
		overloadIndex,
		isOptional
	};
}

export { MethodSignatureNode, MethodSignatureAttributes, extractMethodSignatureAttributes };
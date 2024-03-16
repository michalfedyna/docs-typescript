import {
	Exported,
	FileUrl,
	Name,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";
import { ApiFunction, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface FunctionAttributes
	extends Name,
		Signature,
		Exported,
		Overload,
		Parameters,
		Returns,
		TypeParameters,
		ReleaseTag,
		FileUrl {}

class FunctionNode extends ApiNode<FunctionAttributes> {
	public type: ApiNodeType = ApiNodeType.FunctionNode;
}

function extractFunctionAttributes(apiFunction: ApiFunction): FunctionAttributes {
	const { displayName, fileUrlPath, overloadIndex, isExported } = apiFunction;
	const parameters = apiFunction.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const returnType = apiFunction.returnTypeExcerpt.text;
	const typeParameters = apiFunction.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiFunction.releaseTag);
	const signature = apiFunction.excerpt.text;

	return {
		fileUrlPath,
		isExported,
		name: displayName,
		overloadIndex,
		parameters,
		releaseTag,
		returnType,
		signature,
		typeParameters
	};
}

export { FunctionNode, FunctionAttributes, extractFunctionAttributes };

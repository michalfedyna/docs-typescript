import { DocsExtractor } from "../DocsExtractor.js";
import {
	Docs,
	Exported,
	FileUrl,
	Name,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./ApiAttributes.js";
import { ApiNode, ApiNodeType } from "./ApiNode.js";
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
		FileUrl,
		Docs {}

class FunctionNode extends ApiNode<FunctionAttributes> {
	public type: ApiNodeType = ApiNodeType.FunctionNode;
}

function extractFunctionAttributes(apiFunction: ApiFunction): FunctionAttributes {
	const { displayName, fileUrlPath, overloadIndex, isExported } = apiFunction;
	const docs = DocsExtractor.extract(apiFunction);
	const parameters = apiFunction.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional,
		doc: DocsExtractor.traverse(apiFunction, parameter.tsdocParamBlock)
	}));
	const returnType = apiFunction.returnTypeExcerpt.text;
	const typeParameters = apiFunction.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text,
		doc: DocsExtractor.traverse(apiFunction, typeParameter.tsdocTypeParamBlock)
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiFunction.releaseTag);

	// TODO: Overloads

	const parametersSignature = parameters
		.map((parameter) => `${parameter.name}${parameter.isOptional ? "?" : ""}: ${parameter.type}`)
		.join(", ");

	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);
	const typeParametersSignature = typeParameters.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";

	const signature = `function ${displayName}${typeParametersSignature}(${parametersSignature}): ${returnType};`;

	return {
		fileUrlPath,
		isExported,
		name: displayName,
		overloadIndex,
		parameters,
		releaseTag,
		returnType,
		signature,
		typeParameters,
		docs
	};
}

export { FunctionNode, FunctionAttributes, extractFunctionAttributes };

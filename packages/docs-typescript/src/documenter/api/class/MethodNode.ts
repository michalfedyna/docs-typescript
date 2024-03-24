import { DocsExtractor } from "../../DocsExtractor";
import {
	Abstract,
	Docs,
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	Protected,
	ReleaseTag,
	Returns,
	Signature,
	Static,
	TypeParameters
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiMethod, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface MethodAttributes
	extends Name,
		ReleaseTag,
		FileUrl,
		Signature,
		Abstract,
		Optional,
		Static,
		Protected,
		Overload,
		Returns,
		Parameters,
		TypeParameters,
		Docs {}

class MethodNode extends ApiNode<MethodAttributes> {
	public type: ApiNodeType = ApiNodeType.MethodNode;
}

function extractMethodAttributes(apiMethod: ApiMethod): MethodAttributes {
	const { displayName, isStatic, isAbstract, isProtected, isOptional, overloadIndex, fileUrlPath } = apiMethod;
	const returnType = apiMethod.returnTypeExcerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiMethod.releaseTag);
	const docs = DocsExtractor.extract(apiMethod);

	const parameters = apiMethod.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional,
		doc: DocsExtractor.traverse(parameter.tsdocParamBlock)
	}));
	const typeParameters = apiMethod.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text,
		doc: DocsExtractor.traverse(typeParameter.tsdocTypeParamBlock)
	}));

	const parametersSignature = parameters
		.map((parameter) => `${parameter.name}${parameter.isOptional ? "?" : ""}: ${parameter.type}`)
		.join(", ");
	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);
	const typeParametersSignature = typeParameters.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";
	const signaturePrefix = `${isStatic ? "static " : ""}${isAbstract ? "abstract " : ""}${isProtected ? "protected " : ""}`;

	const signature = `${signaturePrefix}${displayName}${typeParametersSignature}(${parametersSignature}): ${returnType};`;

	return {
		name: displayName,
		releaseTag,
		signature,
		fileUrlPath,
		isAbstract,
		isOptional,
		isProtected,
		isStatic,
		overloadIndex,
		parameters,
		typeParameters,
		returnType,
		docs
	};
}

export { MethodNode, MethodAttributes, extractMethodAttributes };

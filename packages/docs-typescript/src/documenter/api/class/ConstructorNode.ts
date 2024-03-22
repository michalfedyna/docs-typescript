import { FileUrl, Name, Overload, Parameters, Protected, ReleaseTag, Signature } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiConstructor, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface ConstructorAttributes extends Name, ReleaseTag, Signature, FileUrl, Overload, Protected, Parameters {}

class ConstructorNode extends ApiNode<ConstructorAttributes> {
	public type: ApiNodeType = ApiNodeType.ConstructorNode;
}

function extractConstructorAttributes(apiConstructor: ApiConstructor): ConstructorAttributes {
	const { displayName, overloadIndex, isProtected, fileUrlPath } = apiConstructor;
	const parameters = apiConstructor.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiConstructor.releaseTag);

	const signature = `constructor(${parameters.map((parameter) => `${parameter.name}${parameter.isOptional ? "?" : ""}: ${parameter.type}`).join(", ")})`;

	return {
		fileUrlPath,
		isProtected,
		name: displayName,
		overloadIndex,
		parameters,
		releaseTag,
		signature
	};
}

export { ConstructorNode, ConstructorAttributes, extractConstructorAttributes };

import {
	Abstract,
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	Protected,
	ReleaseTag,
	Returns,
	Signature,
	Static
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
		Parameters {}

class MethodNode extends ApiNode<MethodAttributes> {
	public type: ApiNodeType = ApiNodeType.MethodNode;
}

function extractMethodAttributes(apiMethod: ApiMethod): MethodAttributes {
	const parameters = apiMethod.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const returnType = apiMethod.returnTypeExcerpt.text;
	const { displayName, isStatic, isAbstract, isProtected, isOptional, overloadIndex, fileUrlPath } = apiMethod;
	const releaseTag = ApiReleaseTag.getTagName(apiMethod.releaseTag);
	const signature = apiMethod.excerpt.text;

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
		returnType
	};
}

export { MethodNode, MethodAttributes, extractMethodAttributes };

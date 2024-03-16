import { FileUrl, Name, Overload, Parameters, Readonly, ReleaseTag, Returns, Signature } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiIndexSignature, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface IndexSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Parameters,
		Overload,
		Returns,
		FileUrl,
		Readonly {}

class IndexSignatureNode extends ApiNode<IndexSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.IndexSignatureNode;
}

function extractIndexSignatureAttributes(apiIndexSignature: ApiIndexSignature): IndexSignatureAttributes {
	const { displayName, fileUrlPath, overloadIndex, isReadonly } = apiIndexSignature;
	const parameters = apiIndexSignature.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional
	}));
	const returnType = apiIndexSignature.returnTypeExcerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiIndexSignature.releaseTag);
	const signature = apiIndexSignature.excerpt.text;

	return { name: displayName, fileUrlPath, parameters, returnType, overloadIndex, isReadonly, signature, releaseTag };
}

export { IndexSignatureNode, IndexSignatureAttributes, extractIndexSignatureAttributes };

import { DocsExtractor } from "../../DocsExtractor.js";
import {
	Docs,
	FileUrl,
	Name,
	Overload,
	Parameters,
	Readonly,
	ReleaseTag,
	Returns,
	Signature
} from "../ApiAttributes.js";
import { ApiNode, ApiNodeType } from "../ApiNode.js";
import { ApiIndexSignature, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface IndexSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Parameters,
		Overload,
		Returns,
		FileUrl,
		Readonly,
		Docs {}

class IndexSignatureNode extends ApiNode<IndexSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.IndexSignatureNode;
}

function extractIndexSignatureAttributes(apiIndexSignature: ApiIndexSignature): IndexSignatureAttributes {
	const { displayName, fileUrlPath, overloadIndex, isReadonly } = apiIndexSignature;
	const docs = DocsExtractor.extract(apiIndexSignature);
	const parameters = apiIndexSignature.parameters.map((parameter) => ({
		name: parameter.name,
		type: parameter.parameterTypeExcerpt.text,
		isOptional: parameter.isOptional,
		doc: DocsExtractor.traverse(apiIndexSignature, parameter.tsdocParamBlock)
	}));
	const returnType = apiIndexSignature.returnTypeExcerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiIndexSignature.releaseTag);
	const signature = apiIndexSignature.excerpt.text;

	return {
		name: displayName,
		docs,
		fileUrlPath,
		parameters,
		returnType,
		overloadIndex,
		isReadonly,
		signature,
		releaseTag
	};
}

export { IndexSignatureNode, IndexSignatureAttributes, extractIndexSignatureAttributes };

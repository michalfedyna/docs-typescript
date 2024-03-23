import { DocsExtractor } from "../DocsExtractor";
import { Docs, Exported, FileUrl, Initializer, Name, Readonly, ReleaseTag, Signature, Type } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";
import { ApiVariable, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface VariableAttributes
	extends Name,
		Docs,
		Signature,
		Exported,
		Readonly,
		Initializer,
		ReleaseTag,
		Type,
		FileUrl {}

class VariableNode extends ApiNode<VariableAttributes> {
	public type: ApiNodeType = ApiNodeType.VariableNode;
}

function extractVariableAttributes(apiVariable: ApiVariable): VariableAttributes {
	const signature = createSignature(apiVariable);

	const docs = DocsExtractor.extract(apiVariable);
	const { displayName, fileUrlPath, isExported, isReadonly } = apiVariable;
	const type = apiVariable.variableTypeExcerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiVariable.releaseTag);
	const initializer = apiVariable.initializerExcerpt?.text;

	return { name: displayName, fileUrlPath, docs, releaseTag, signature, isExported, initializer, isReadonly, type };
}

function createSignature(apiVariable: ApiVariable): string {
	const nameSignature = apiVariable.displayName;
	const typeSignature =
		apiVariable.variableTypeExcerpt.text.length > 0 ? `: ${apiVariable.variableTypeExcerpt.text}` : "";
	const initializerSignature =
		apiVariable.initializerExcerpt && apiVariable.initializerExcerpt.text.length > 0
			? ` = ${apiVariable.initializerExcerpt.text}`
			: "";

	return `var ${nameSignature}${typeSignature}${initializerSignature}`;
}

export { VariableNode, VariableAttributes, extractVariableAttributes };

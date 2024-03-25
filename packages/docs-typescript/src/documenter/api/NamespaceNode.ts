import { ApiNamespace, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

import { DocsExtractor } from "../DocsExtractor.js";
import { Docs, Exported, FileUrl, Name, ReleaseTag, Signature } from "./ApiAttributes.js";
import { ApiNode, ApiNodeType } from "./ApiNode.js";

interface NamespaceAttributes extends Name, Docs, Signature, Exported, ReleaseTag, FileUrl {}

class NamespaceNode extends ApiNode<NamespaceAttributes> {
	public type: ApiNodeType = ApiNodeType.NamespaceNode;
}

function extractNamespaceAttributes(apiNamespace: ApiNamespace): NamespaceAttributes {
	const { displayName, fileUrlPath, isExported } = apiNamespace;
	const releaseTag = ApiReleaseTag.getTagName(apiNamespace.releaseTag);
	const signature = `namespace ${displayName}{}`;
	const docs = DocsExtractor.extract(apiNamespace);

	return {
		name: displayName,
		releaseTag,
		signature,
		isExported,
		fileUrlPath,
		docs
	};
}

export { NamespaceNode, NamespaceAttributes, extractNamespaceAttributes };

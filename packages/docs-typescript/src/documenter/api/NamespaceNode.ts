import { Exported, FileUrl, Name, ReleaseTag, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";
import { ApiNamespace, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface NamespaceAttributes extends Name, Signature, Exported, ReleaseTag, FileUrl {}

class NamespaceNode extends ApiNode<NamespaceAttributes> {
	public type: ApiNodeType = ApiNodeType.NamespaceNode;
}

function extractNamespaceAttributes(apiNamespace: ApiNamespace): NamespaceAttributes {
	const { displayName, fileUrlPath, isExported } = apiNamespace;
	const releaseTag = ApiReleaseTag.getTagName(apiNamespace.releaseTag);
	const signature = `namespace ${displayName}{}`;

	return {
		name: displayName,
		releaseTag,
		signature,
		isExported,
		fileUrlPath
	};
}

export { NamespaceNode, NamespaceAttributes, extractNamespaceAttributes };

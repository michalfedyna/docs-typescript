import { Exported, FileUrl, Name, ReleaseTag, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface NamespaceAttributes extends Name, Signature, Exported, ReleaseTag, FileUrl {}

class NamespaceNode extends ApiNode<NamespaceAttributes> {
	public type: ApiNodeType = ApiNodeType.NamespaceNode;
}

export { NamespaceNode, NamespaceAttributes };

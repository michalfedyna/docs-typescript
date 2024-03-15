import { Exported, ExtendsArray, FileUrl, Name, ReleaseTag, Signature, TypeParameters } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface InterfaceAttributes extends Name, ReleaseTag, Signature, FileUrl, ExtendsArray, TypeParameters, Exported {}

class InterfaceNode extends ApiNode<InterfaceAttributes> {
	public type: ApiNodeType = ApiNodeType.InterfaceNode;
}

export { InterfaceNode, InterfaceAttributes };

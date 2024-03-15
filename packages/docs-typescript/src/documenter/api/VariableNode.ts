import { Exported, FileUrl, Initializer, Name, Readonly, ReleaseTag, Signature, Type } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface VariableAttributes extends Name, Signature, Exported, Readonly, Initializer, ReleaseTag, Type, FileUrl {}

class VariableNode extends ApiNode<VariableAttributes> {
	public type: ApiNodeType = ApiNodeType.VariableNode;
}

export { VariableNode, VariableAttributes };

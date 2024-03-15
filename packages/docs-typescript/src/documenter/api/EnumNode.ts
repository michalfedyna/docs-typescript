import { Exported, FileUrl, Members, Name, ReleaseTag, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface EnumAttributes extends Name, ReleaseTag, Signature, Exported, FileUrl, Members {}

class EnumNode extends ApiNode<EnumAttributes> {
	public type: ApiNodeType = ApiNodeType.EnumNode;
}

export { EnumNode, EnumAttributes };

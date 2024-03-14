import { FileUrl, Name, ReleaseTag, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface EnumMemberAttributes extends Name, FileUrl, Signature, ReleaseTag {}

class EnumMemberNode extends ApiNode<EnumMemberAttributes> {
	public type: ApiNodeType = ApiNodeType.EnumMemberNode;
}

export { EnumMemberNode, EnumMemberAttributes };

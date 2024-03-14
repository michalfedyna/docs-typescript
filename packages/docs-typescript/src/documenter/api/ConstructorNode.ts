import { FileUrl, Name, Overload, Parameters, Protected, ReleaseTag, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface ConstructorAttributes extends Name, ReleaseTag, Signature, FileUrl, Overload, Protected, Parameters {}

class ConstructorNode extends ApiNode<ConstructorAttributes> {
	public type: ApiNodeType = ApiNodeType.ConstructorNode;
}

export { ConstructorNode, ConstructorAttributes };

import { Exported, FileUrl, Name, ReleaseTag, Signature, Type, TypeParameters } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface TypeAliasAttributes extends Name, Signature, ReleaseTag, Type, TypeParameters, FileUrl, Exported {}

class TypeAliasNode extends ApiNode<TypeAliasAttributes> {
	public type: ApiNodeType = ApiNodeType.TypeAliasNode;
}

export { TypeAliasNode, TypeAliasAttributes };

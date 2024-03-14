import {
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface MethodSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		FileUrl,
		Optional,
		Returns,
		Overload,
		Parameters,
		TypeParameters {}

class MethodSignatureNode extends ApiNode<MethodSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.MethodSignatureNode;
}

export { MethodSignatureNode, MethodSignatureAttributes };

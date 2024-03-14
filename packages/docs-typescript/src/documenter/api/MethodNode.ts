import {
	Abstract,
	FileUrl,
	Name,
	Optional,
	Overload,
	Parameters,
	Protected,
	ReleaseTag,
	Returns,
	Signature,
	Static
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface MethodAttributes
	extends Name,
		ReleaseTag,
		FileUrl,
		Signature,
		Abstract,
		Optional,
		Static,
		Protected,
		Overload,
		Returns,
		Parameters {}

class MethodNode extends ApiNode<MethodAttributes> {
	public type: ApiNodeType = ApiNodeType.MethodNode;
}

export { MethodNode, MethodAttributes };

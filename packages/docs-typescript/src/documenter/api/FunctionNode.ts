import {
	Exported,
	FileUrl,
	Name,
	Overload,
	Parameters,
	ReleaseTag,
	Returns,
	Signature,
	TypeParameters
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface FunctionAttributes
	extends Name,
		Signature,
		Exported,
		Overload,
		Parameters,
		Returns,
		TypeParameters,
		ReleaseTag,
		FileUrl {}

class FunctionNode extends ApiNode<FunctionAttributes> {
	public type: ApiNodeType = ApiNodeType.FunctionNode;
}

export { FunctionNode, FunctionAttributes };

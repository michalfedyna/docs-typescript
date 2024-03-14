import {
	Abstract,
	Exported,
	Extends,
	FileUrl,
	Implements,
	Name,
	ReleaseTag,
	Signature,
	TypeParameters
} from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface ClassAttributes
	extends Name,
		ReleaseTag,
		Signature,
		Abstract,
		Implements,
		Extends,
		TypeParameters,
		Exported,
		FileUrl {}

class ClassNode extends ApiNode<ClassAttributes> {
	public type: ApiNodeType = ApiNodeType.ClassNode;
}

export { ClassNode, ClassAttributes };

import { FileUrl, Name, Overload, Parameters, ReleaseTag, Returns, Signature, TypeParameters } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "./ApiNode";

interface ConstructorSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Overload,
		FileUrl,
		Parameters,
		TypeParameters,
		Returns {}

class ConstructorSignatureNode extends ApiNode<ConstructorSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.ConstructorSignatureNode;
}

export { ConstructorSignatureNode, ConstructorSignatureAttributes };

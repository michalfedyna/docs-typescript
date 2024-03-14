import { FileUrl, Name, Overload, Parameters, Readonly, ReleaseTag, Returns, Signature } from "./ApiAttributes";
import { ApiNode, ApiNodeType } from "../tree/ApiNode";

interface IndexSignatureAttributes
	extends Name,
		Signature,
		ReleaseTag,
		Parameters,
		Overload,
		Returns,
		FileUrl,
		Readonly {}

class IndexSignatureNode extends ApiNode<IndexSignatureAttributes> {
	public type: ApiNodeType = ApiNodeType.IndexSignatureNode;
}

export { IndexSignatureNode, IndexSignatureAttributes };

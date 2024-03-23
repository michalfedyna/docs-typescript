import { DocsExtractor } from "../../DocsExtractor";
import { Docs, Exported, FileUrl, Members, Name, ReleaseTag, Signature } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiEnum, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface EnumAttributes extends Name, Docs, ReleaseTag, Signature, Exported, FileUrl, Members {}

class EnumNode extends ApiNode<EnumAttributes> {
	public type: ApiNodeType = ApiNodeType.EnumNode;
}

function extractEnumAttributes(apiEnum: ApiEnum): EnumAttributes {
	const { displayName, fileUrlPath, isExported } = apiEnum;
	const docs = DocsExtractor.extract(apiEnum);
	const members = apiEnum.members.map((member) => ({
		name: member.name,
		doc: DocsExtractor.traverse(member.tsdocComment?.summarySection)
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiEnum.releaseTag);

	let signature = `enum ${displayName} {${members.map((member) => member.name).join(", ")}}`;

	return { name: displayName, docs, releaseTag, isExported, signature, fileUrlPath, members };
}

export { EnumNode, EnumAttributes, extractEnumAttributes };

import { DocsExtractor } from "../../DocsExtractor";
import { Docs, FileUrl, Name, ReleaseTag, Signature } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiEnumMember, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface EnumMemberAttributes extends Name, Docs, FileUrl, Signature, ReleaseTag {}

class EnumMemberNode extends ApiNode<EnumMemberAttributes> {
	public type: ApiNodeType = ApiNodeType.EnumMemberNode;
}

function extractEnumMemberAttributes(apiEnumMember: ApiEnumMember): EnumMemberAttributes {
	const { displayName, fileUrlPath } = apiEnumMember;
	const docs = DocsExtractor.extract(apiEnumMember);
	const signature = apiEnumMember.excerpt.text;
	const releaseTag = ApiReleaseTag.getTagName(apiEnumMember.releaseTag);

	return { name: displayName, docs, fileUrlPath, signature, releaseTag };
}

export { EnumMemberNode, EnumMemberAttributes, extractEnumMemberAttributes };

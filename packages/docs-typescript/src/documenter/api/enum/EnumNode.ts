import { Exported, FileUrl, Members, Name, ReleaseTag, Signature } from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiEnum, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface EnumAttributes extends Name, ReleaseTag, Signature, Exported, FileUrl, Members {}

class EnumNode extends ApiNode<EnumAttributes> {
	public type: ApiNodeType = ApiNodeType.EnumNode;
}

function extractEnumAttributes(apiEnum: ApiEnum): EnumAttributes {
	const { displayName, fileUrlPath, isExported } = apiEnum;
	const members = apiEnum.members.map((member) => ({
		name: member.name
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiEnum.releaseTag);



	const signature = `enum ${displayName} {}`;

	return { name: displayName, releaseTag, isExported, signature, fileUrlPath, members };
}

export { EnumNode, EnumAttributes, extractEnumAttributes };

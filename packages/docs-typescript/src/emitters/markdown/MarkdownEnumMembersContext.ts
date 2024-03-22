import { Members } from "../../documenter/api/ApiAttributes";
import { buildDoc } from "./MarkdownDocsContext";

type MarkdownEnumMembersContext = {
	parent: string;
	name: string;
	doc?: string[];
}[];

function buildMarkdownEnumMembersContext(enumMembers: Members["members"], parent: string): MarkdownEnumMembersContext {
	return enumMembers.map((member) => {
		const { name } = member;
		let doc: string[] | undefined;

		if (member.doc) {
			doc = [];
			member.doc.forEach(buildDoc(doc));
		}

		return { name, parent, doc };
	});
}

export { MarkdownEnumMembersContext, buildMarkdownEnumMembersContext };

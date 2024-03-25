import { Members } from "../../documenter/api/ApiAttributes.js";
import { buildDoc } from "./MDDocsContext.js";

type MDEnumMembersContext = {
	parent: string;
	name: string;
	doc?: string[];
}[];

function buildMDEnumMembersContext(enumMembers: Members["members"], parent: string): MDEnumMembersContext {
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

export { MDEnumMembersContext, buildMDEnumMembersContext };

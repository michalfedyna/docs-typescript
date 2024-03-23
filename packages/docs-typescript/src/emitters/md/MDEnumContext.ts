import { EnumNode } from "../../documenter/api/enum/EnumNode";
import { HandlebarsMDContext } from "../Template";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDEnumMembersContext, buildMDEnumMembersContext } from "./MDEnumMembersContext";

interface MDEnumContext {
	name: string;
	signature: string;
	members: MDEnumMembersContext;
	docs: MDDocsContext;
}

function buildMDEnumContext(enumNode: EnumNode): HandlebarsMDContext<MDEnumContext> {
	const { name, signature } = enumNode.value.attributes;

	const members = buildMDEnumMembersContext(enumNode.value.attributes.members, name);
	const docs = buildMDDocsContext(enumNode.value.attributes.docs);

	return [{ name, signature, members, docs }, "enum"];
}

export { MDEnumContext, buildMDEnumContext };

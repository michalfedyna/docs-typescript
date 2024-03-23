import { EnumNode } from "../../documenter/api/enum/EnumNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { MarkdownEnumMembersContext, buildMarkdownEnumMembersContext } from "./MarkdownEnumMembersContext";

interface MarkdownEnumContext {
	name: string;
	signature: string;
	members: MarkdownEnumMembersContext;
	docs: MarkdownDocsContext;
}

function buildMarkdownEnumContext(enumNode: EnumNode): HandlebarsMarkdownContext<MarkdownEnumContext> {
	const { name, signature } = enumNode.value.attributes;

	const members = buildMarkdownEnumMembersContext(enumNode.value.attributes.members, name);
	const docs = buildMarkdownDocsContext(enumNode.value.attributes.docs);

	return [{ name, signature, members, docs }, "enum"];
}

export { MarkdownEnumContext, buildMarkdownEnumContext };

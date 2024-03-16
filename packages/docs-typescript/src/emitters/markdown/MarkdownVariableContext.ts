import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { VariableAttributes, VariableNode } from "../../documenter/api/VariableNode";
import { HandlebarsMarkdownContext } from "../Template";

interface MarkdownVariableContext {
	name: string;
	signature: string;
}

function buildMarkdownVariableContext(variableNode: VariableNode): HandlebarsMarkdownContext<MarkdownVariableContext> {
	const { name, signature } = variableNode.value.attributes;

	return [
		{
			name,
			signature
		},
		"variable"
	];
}

export { MarkdownVariableContext, buildMarkdownVariableContext };

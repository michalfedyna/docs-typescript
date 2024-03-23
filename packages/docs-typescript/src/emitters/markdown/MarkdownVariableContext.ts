import { VariableNode } from "../../documenter/api/VariableNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";

interface MarkdownVariableContext {
	name: string;
	signature: string;
	docs: MarkdownDocsContext;
}

function buildMarkdownVariableContext(variableNode: VariableNode): HandlebarsMarkdownContext<MarkdownVariableContext> {
	const { name, signature } = variableNode.value.attributes;
	const docs = buildMarkdownDocsContext(variableNode.value.attributes.docs);

	return [
		{
			name,
			signature,
			docs
		},
		"variable"
	];
}

export { MarkdownVariableContext, buildMarkdownVariableContext };

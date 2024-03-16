import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { FunctionAttributes, FunctionNode } from "../../documenter/api/FunctionNode";
import { HandlebarsMarkdownContext } from "../Template";

interface MarkdownFunctionContext {
	attributes: FunctionAttributes;
	docs: DocsAttributes;
}

function buildMarkdownFunctionContext(functionNode: FunctionNode): HandlebarsMarkdownContext<MarkdownFunctionContext> {
	return [
		{
			attributes: functionNode.value.attributes,
			docs: {}
		},
		"function"
	];
}

export { MarkdownFunctionContext, buildMarkdownFunctionContext };

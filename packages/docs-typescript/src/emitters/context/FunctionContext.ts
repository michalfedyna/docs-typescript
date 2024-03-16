import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { FunctionAttributes, FunctionNode } from "../../documenter/api/FunctionNode";
import { HandlebarsContext } from "../Template";

interface FunctionContext {
	attributes: FunctionAttributes;
	docs: DocsAttributes;
}

function buildFunctionContext(functionNode: FunctionNode): HandlebarsContext<FunctionContext> {
	return [
		{
			attributes: functionNode.value.attributes,
			docs: {}
		},
		"function"
	];
}

export { FunctionContext, buildFunctionContext };

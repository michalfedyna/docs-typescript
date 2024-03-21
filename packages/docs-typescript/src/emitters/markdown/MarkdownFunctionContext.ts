import { FunctionNode } from "../../documenter/api/FunctionNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { MarkdownParamsContext, buildMarkdownParamsContext } from "./MarkdownParamsContext";
import { MarkdownTypeParamsContext, buildMarkdownTypeParmas } from "./MarkdownTypeParamsContext";

interface MarkdownFunctionContext {
	name: string;
	signature: string;
	parameters: MarkdownParamsContext;
	typeParameters: MarkdownTypeParamsContext;
	docs: MarkdownDocsContext;
}

function buildMarkdownFunctionContext(functionNode: FunctionNode): HandlebarsMarkdownContext<MarkdownFunctionContext> {
	const { name, signature, returnType, releaseTag } = functionNode.value.attributes;
	const docs = buildMarkdownDocsContext(functionNode.value.docs);
	const parameters = buildMarkdownParamsContext(functionNode.value.attributes.parameters);
	const typeParameters = buildMarkdownTypeParmas(functionNode.value.attributes.typeParameters);

	return [
		{
			name,
			parameters,
      typeParameters,
			signature,
			docs
		},
		"function"
	];
}

export { MarkdownFunctionContext, buildMarkdownFunctionContext };

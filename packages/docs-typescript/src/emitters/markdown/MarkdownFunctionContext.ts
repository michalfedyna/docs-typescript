import { FunctionNode } from "../../documenter/api/FunctionNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { MarkdownParamsContext, buildMarkdownParamsContext } from "./MarkdownParamsContext";
import { MarkdownReturnsContext, buildMarkdownReturnContext } from "./MarkdownReturnsContext";
import { MarkdownTypeParamsContext, buildMarkdownTypeParmas } from "./MarkdownTypeParamsContext";

interface MarkdownFunctionContext {
	name: string;
	signature: string;
	parameters: MarkdownParamsContext;
	typeParameters: MarkdownTypeParamsContext;
  returns: MarkdownReturnsContext,
	docs: MarkdownDocsContext;
}

function buildMarkdownFunctionContext(functionNode: FunctionNode): HandlebarsMarkdownContext<MarkdownFunctionContext> {
	const { name, signature } = functionNode.value.attributes;
	const docs = buildMarkdownDocsContext(functionNode.value.docs);
	const parameters = buildMarkdownParamsContext(functionNode.value.attributes.parameters);
	const typeParameters = buildMarkdownTypeParmas(functionNode.value.attributes.typeParameters);
  const returns = buildMarkdownReturnContext(functionNode.value.attributes.returnType, docs.returns)

	return [
		{
			name,
			signature,
			parameters,
      typeParameters,
      returns,
			docs
		},
		"function"
	];
}

export { MarkdownFunctionContext, buildMarkdownFunctionContext };

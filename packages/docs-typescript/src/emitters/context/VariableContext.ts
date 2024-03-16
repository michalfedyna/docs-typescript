import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { VariableAttributes, VariableNode } from "../../documenter/api/VariableNode";
import { HandlebarsContext } from "../Template";

interface VariableContext {
	attributes: VariableAttributes;
	docs: DocsAttributes;
}

function buildVariableContext(variableNode: VariableNode): HandlebarsContext<VariableContext> {
	const rootNode = variableNode.getRoot();

	return [
		{
			attributes: variableNode.value.attributes,
			docs: {}
		},
		"variable"
	];
}

export { VariableContext, buildVariableContext };

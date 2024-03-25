import { VariableNode } from "../../documenter/api/VariableNode.js";
import { HandlebarsMDContext } from "../Template.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";

interface MDVariableContext {
	name: string;
	signature: string;
	docs: MDDocsContext;
}

function buildMDVariableContext(variableNode: VariableNode): HandlebarsMDContext<MDVariableContext> {
	const { name, signature } = variableNode.value.attributes;
	const docs = buildMDDocsContext(variableNode.value.attributes.docs);

	return [
		{
			name,
			signature,
			docs
		},
		"variable"
	];
}

export { MDVariableContext, buildMDVariableContext };

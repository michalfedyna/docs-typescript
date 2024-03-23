import { VariableNode } from "../../documenter/api/VariableNode";
import { HandlebarsMDContext } from "../Template";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";

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

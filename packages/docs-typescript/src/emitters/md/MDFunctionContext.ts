import { FunctionNode } from "../../documenter/api/FunctionNode.js";
import { HandlebarsMDContext } from "../Template.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext.js";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDFunctionContext {
	name: string;
	signature: string;
	parameters: MDParamsContext;
	typeParameters: MDTypeParamsContext;
	returns: MDReturnsContext;
	docs: MDDocsContext;
}

function buildMDFunctionContext(functionNode: FunctionNode): HandlebarsMDContext<MDFunctionContext> {
	const { name, signature } = functionNode.value.attributes;
	const docs = buildMDDocsContext(functionNode.value.attributes.docs);
	const parameters = buildMDParamsContext(functionNode.value.attributes.parameters);
	const typeParameters = buildMDTypeParams(functionNode.value.attributes.typeParameters);
	const returns = buildMDReturnContext(functionNode.value.attributes.returnType, docs.returns);

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

export { MDFunctionContext, buildMDFunctionContext };

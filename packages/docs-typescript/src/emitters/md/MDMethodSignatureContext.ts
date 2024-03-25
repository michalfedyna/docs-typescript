import { MethodSignatureAttributes } from "../../documenter/api/interface/MethodSignatureNode.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext.js";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDMethodSignatureContext {
	name: string;
	signature: string;
	isOptional: boolean;
	returns: MDReturnsContext;
	params: MDParamsContext;
	typeParams: MDTypeParamsContext;
	docs: MDDocsContext;
}

function buildMDMethodSignatureContext(methodSignatureAttributes: MethodSignatureAttributes): MDMethodSignatureContext {
	const { name, signature, isOptional } = methodSignatureAttributes;
	const docs = buildMDDocsContext(methodSignatureAttributes.docs);
	const returns = buildMDReturnContext(methodSignatureAttributes.returnType, docs.returns);
	const params = buildMDParamsContext(methodSignatureAttributes.parameters);
	const typeParams = buildMDTypeParams(methodSignatureAttributes.typeParameters);

	return { name, signature, isOptional, returns, params, typeParams, docs };
}

export { MDMethodSignatureContext, buildMDMethodSignatureContext };

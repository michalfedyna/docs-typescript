import { MethodSignatureAttributes } from "../../documenter/api/interface/MethodSignatureNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

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

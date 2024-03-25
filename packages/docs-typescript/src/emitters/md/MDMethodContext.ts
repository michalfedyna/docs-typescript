import { MethodAttributes } from "../../documenter/api/class/MethodNode.js";

import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext.js";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDMethodContext {
	name: string;
	signature: string;
	isStatic: boolean;
	isAbstract: boolean;
	isOptional: boolean;
	isProtected: boolean;
	parameters: MDParamsContext;
	typeParameters: MDTypeParamsContext;
	returns: MDReturnsContext;
	docs: MDDocsContext;
}

function buildMDMethodContext(methodAttributes: MethodAttributes): MDMethodContext {
	const { name, signature, isStatic, isAbstract, isOptional, isProtected } = methodAttributes;
	const docs = buildMDDocsContext(methodAttributes.docs);
	const parameters = buildMDParamsContext(methodAttributes.parameters);
	const typeParameters = buildMDTypeParams(methodAttributes.typeParameters);
	const returns = buildMDReturnContext(methodAttributes.returnType, docs.returns);

	return { name, signature, isStatic, isAbstract, isOptional, isProtected, parameters, typeParameters, returns, docs };
}

export { MDMethodContext, buildMDMethodContext };

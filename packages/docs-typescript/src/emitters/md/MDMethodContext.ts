import { MethodAttributes } from "../../documenter/api/class/MethodNode";

import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

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

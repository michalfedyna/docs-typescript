import { ConstructorAttributes } from "../../documenter/api/class/ConstructorNode.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext.js";

interface MDConstructorContext {
	name: string;
	signature: string;
	isProtected: boolean;
	params: MDParamsContext;
	docs: MDDocsContext;
}

function buildMDConstructorContext(constructorAttributes: ConstructorAttributes): MDConstructorContext {
	const { name, signature, isProtected } = constructorAttributes;
	const docs = buildMDDocsContext(constructorAttributes.docs);

	const params = buildMDParamsContext(constructorAttributes.parameters);

	return { name, isProtected, signature, params, docs };
}

export { MDConstructorContext, buildMDConstructorContext };

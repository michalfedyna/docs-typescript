import { ConstructorAttributes } from "../../documenter/api/class/ConstructorNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext";

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

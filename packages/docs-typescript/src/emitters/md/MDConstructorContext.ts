import { ConstructorAttributes } from "../../documenter/api/class/ConstructorNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";

interface MDConstructorContext {
	name: string;
	signature: string;
	docs: MDDocsContext;
}

function buildMDConstructorContext(constructorAttributes: ConstructorAttributes): MDConstructorContext {
	const { name, signature } = constructorAttributes;
	const docs = buildMDDocsContext(constructorAttributes.docs);

	return { name, signature, docs };
}

export { MDConstructorContext, buildMDConstructorContext };

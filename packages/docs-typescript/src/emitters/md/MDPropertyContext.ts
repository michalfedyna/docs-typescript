import { PropertyAttributes } from "../../documenter/api/class/PropertyNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";

interface MDPropertyContext {
	name: string;
	signature: string;
	docs: MDDocsContext;
}

function buildMDPropertyContext(propertyAttributes: PropertyAttributes): MDPropertyContext {
	const { name, signature } = propertyAttributes;
	const docs = buildMDDocsContext(propertyAttributes.docs);

	return { name, signature, docs };
}

export { MDPropertyContext, buildMDPropertyContext };

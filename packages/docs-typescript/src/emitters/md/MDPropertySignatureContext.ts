import { PropertySignatureAttributes } from "../../documenter/api/interface/PropertySignatureNode.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";

interface MDPropertySignatureContext {
	name: string;
	signature: string;
	type: string;
	isOptional: boolean;
	isReadonly: boolean;
	isEventProperty: boolean;
	docs: MDDocsContext;
}

function buildMDPropertySignatureContext(
	propertySignatureAttributes: PropertySignatureAttributes
): MDPropertySignatureContext {
	const { name, signature, isOptional, isReadonly, isEventProperty, type } = propertySignatureAttributes;
	const docs = buildMDDocsContext(propertySignatureAttributes.docs);

	return { name, signature, type, isEventProperty, isOptional, isReadonly, docs };
}

export { MDPropertySignatureContext, buildMDPropertySignatureContext };

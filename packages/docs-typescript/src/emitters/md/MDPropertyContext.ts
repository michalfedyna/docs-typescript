import { PropertyAttributes } from "../../documenter/api/class/PropertyNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";

interface MDPropertyContext {
	name: string;
	signature: string;
	type: string;
	initializer: string | undefined;
	isStatic: boolean;
	isAbstract: boolean;
	isOptional: boolean;
	isReadonly: boolean;
	isProtected: boolean;
	isEventProperty: boolean;
	docs: MDDocsContext;
}

function buildMDPropertyContext(propertyAttributes: PropertyAttributes): MDPropertyContext {
	const {
		name,
		signature,
		type,
		initializer,
		isStatic,
		isAbstract,
		isOptional,
		isReadonly,
		isProtected,
		isEventProperty
	} = propertyAttributes;
	const docs = buildMDDocsContext(propertyAttributes.docs);

	return {
		name,
		signature,
		type,
		initializer,
		isStatic,
		isAbstract,
		isOptional,
		isReadonly,
		isProtected,
		isEventProperty,
		docs
	};
}

export { MDPropertyContext, buildMDPropertyContext };

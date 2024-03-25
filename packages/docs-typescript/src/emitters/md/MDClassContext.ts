import { ClassNode } from "../../documenter/api/class/ClassNode.js";
import { HandlebarsMDContext } from "../Template.js";

import { MDConstructorContext, buildMDConstructorContext } from "./MDConstructorContext.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDMethodContext, buildMDMethodContext } from "./MDMethodContext.js";
import { MDPropertyContext, buildMDPropertyContext } from "./MDPropertyContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDClassContext {
	name: string;
	signature: string;
	isAbstract: boolean;
	implementedTypes: string[];
	extendsType: string | undefined;
	typeParams: MDTypeParamsContext;
	constructors: MDConstructorContext[];
	properties: MDPropertyContext[];
	methods: MDMethodContext[];
	docs: MDDocsContext;
}

function buildMDClassContext(classNode: ClassNode): HandlebarsMDContext<MDClassContext> {
	const { name, signature, implementedTypes, extendsType, isAbstract } = classNode.value.attributes;
	const typeParams = buildMDTypeParams(classNode.value.attributes.typeParameters);

	const docs = buildMDDocsContext(classNode.value.attributes.docs);

	const constructors = classNode.value.attributes.constructors.map((constructor) =>
		buildMDConstructorContext(constructor)
	);
	const properties = classNode.value.attributes.properties.map((property) => buildMDPropertyContext(property));
	const methods = classNode.value.attributes.methods.map((method) => buildMDMethodContext(method));

	return [
		{ name, signature, isAbstract, implementedTypes, extendsType, typeParams, constructors, properties, methods, docs },
		"class"
	];
}

export { MDClassContext, buildMDClassContext };

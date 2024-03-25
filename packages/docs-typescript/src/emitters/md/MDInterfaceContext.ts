import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode.js";
import { HandlebarsMDContext } from "../Template.js";
import { MDConstructorSignatureContext, buildMDConstructorSignatureContext } from "./MDConstructorSignatureContext.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDIndexSignatureContext, buildMDIndexSignatureContext } from "./MDIndexSignatureContext.js";
import { MDMethodSignatureContext, buildMDMethodSignatureContext } from "./MDMethodSignatureContext.js";
import { MDPropertySignatureContext, buildMDPropertySignatureContext } from "./MDPropertySignatureContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDInterfaceContext {
	name: string;
	signature: string;
	extendsTypes: string[];
	typeParams: MDTypeParamsContext;
	indexSignatures: MDIndexSignatureContext[];
	constructorSignatures: MDConstructorSignatureContext[];
	propertySignatures: MDPropertySignatureContext[];
	methodSignatures: MDMethodSignatureContext[];
	docs: MDDocsContext;
}

function buildMDInterfaceContext(interfaceNode: InterfaceNode): HandlebarsMDContext<MDInterfaceContext> {
	const { name, signature, extendsTypes } = interfaceNode.value.attributes;
	const typeParams = buildMDTypeParams(interfaceNode.value.attributes.typeParameters);

	const docs = buildMDDocsContext(interfaceNode.value.attributes.docs);

	const indexSignatures = interfaceNode.value.attributes.indexSignatures.map((index) =>
		buildMDIndexSignatureContext(index)
	);

	const constructorSignatures = interfaceNode.value.attributes.constructorSignatures.map((constructor) =>
		buildMDConstructorSignatureContext(constructor)
	);

	const propertySignatures = interfaceNode.value.attributes.propertySignatures.map((property) =>
		buildMDPropertySignatureContext(property)
	);

	const methodSignatures = interfaceNode.value.attributes.methodSignatures.map((method) =>
		buildMDMethodSignatureContext(method)
	);

	return [
		{
			name,
			signature,
			docs,
			extendsTypes,
			indexSignatures,
			constructorSignatures,
			propertySignatures,
			methodSignatures,
			typeParams
		},
		"interface"
	];
}

export { MDInterfaceContext, buildMDInterfaceContext };

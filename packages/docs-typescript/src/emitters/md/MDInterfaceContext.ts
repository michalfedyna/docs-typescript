import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode";
import { HandlebarsMDContext } from "../Template";
import { MDConstructorSignatureContext, buildMDConstructorSignatureContext } from "./MDConstructorSignatureContext";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDIndexSignatureContext, buildMDIndexSignatureContext } from "./MDIndexSignatureContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

interface MDInterfaceContext {
	name: string;
	signature: string;
	extendsTypes: string[];
	typeParams: MDTypeParamsContext;
	indexSignatures: MDIndexSignatureContext[];
	constructorSignatures: MDConstructorSignatureContext[];
	propertySignatures: [];
	methodSignatures: [];
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

	return [{ name, signature, docs, extendsTypes, indexSignatures, constructorSignatures, typeParams }, "interface"];
}

export { MDInterfaceContext, buildMDInterfaceContext };

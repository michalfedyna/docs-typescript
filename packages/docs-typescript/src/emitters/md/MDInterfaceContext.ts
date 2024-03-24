import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode";
import { HandlebarsMDContext } from "../Template";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

interface MDInterfaceContext {
	name: string;
	signature: string;
	extendsTypes: string[];
	typeParams: MDTypeParamsContext;
	docs: MDDocsContext;
}

function buildMDInterfaceContext(interfaceNode: InterfaceNode): HandlebarsMDContext<MDInterfaceContext> {
	const { name, signature, extendsTypes } = interfaceNode.value.attributes;
	const typeParams = buildMDTypeParams(interfaceNode.value.attributes.typeParameters);

	const docs = buildMDDocsContext(interfaceNode.value.attributes.docs);

	return [{ name, signature, docs, extendsTypes, typeParams }, "interface"];
}

export { MDInterfaceContext, buildMDInterfaceContext };

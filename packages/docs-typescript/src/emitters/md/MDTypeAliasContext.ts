import { TypeAliasNode } from "../../documenter/api/TypeAliasNode";
import { HandlebarsMDContext } from "../Template";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

interface MDTypeAliasContext {
	name: string;
	signature: string;
	typeParameters: MDTypeParamsContext;
	docs: MDDocsContext;
}

function buildMDTypeAliasContext(typeAliasNode: TypeAliasNode): HandlebarsMDContext<MDTypeAliasContext> {
	const { name, signature } = typeAliasNode.value.attributes;

	const docs = buildMDDocsContext(typeAliasNode.value.attributes.docs);
	const typeParameters = buildMDTypeParams(typeAliasNode.value.attributes.typeParameters);

	return [{ name, signature, typeParameters, docs }, "typeAlias"];
}

export { MDTypeAliasContext, buildMDTypeAliasContext };

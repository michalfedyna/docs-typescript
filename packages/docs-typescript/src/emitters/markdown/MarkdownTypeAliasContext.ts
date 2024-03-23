import { TypeAliasNode } from "../../documenter/api/TypeAliasNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { MarkdownTypeParamsContext, buildMarkdownTypeParmas } from "./MarkdownTypeParamsContext";

interface MarkdownTypeAliasContext {
	name: string;
	signature: string;
	typeParameters: MarkdownTypeParamsContext;
	docs: MarkdownDocsContext;
}

function buildMarkdownTypeAliasContext(
	typeAliasNode: TypeAliasNode
): HandlebarsMarkdownContext<MarkdownTypeAliasContext> {
	const { name, signature } = typeAliasNode.value.attributes;

	const docs = buildMarkdownDocsContext(typeAliasNode.value.attributes.docs);
	const typeParameters = buildMarkdownTypeParmas(typeAliasNode.value.attributes.typeParameters);

	return [{ name, signature, typeParameters, docs }, "typeAlias"];
}

export { MarkdownTypeAliasContext, buildMarkdownTypeAliasContext };

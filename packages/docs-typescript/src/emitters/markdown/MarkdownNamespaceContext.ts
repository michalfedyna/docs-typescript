import { HandlebarsMarkdownContext } from "../Template";
import { NamespaceNode } from "../../documenter/api/NamespaceNode";

interface MarkdownNamespaceContext {}

function buildMarkdownNamespaceContext(
	namespaceNode: NamespaceNode
): HandlebarsMarkdownContext<MarkdownNamespaceContext> {
	return [{}, "namespace"];
}

export { MarkdownNamespaceContext, buildMarkdownNamespaceContext };

import { HandlebarsMDContext } from "../Template";
import { NamespaceNode } from "../../documenter/api/NamespaceNode";

interface MDNamespaceContext {}

function buildMDNamespaceContext(namespaceNode: NamespaceNode): HandlebarsMDContext<MDNamespaceContext> {
	return [{}, "namespace"];
}

export { MDNamespaceContext, buildMDNamespaceContext };

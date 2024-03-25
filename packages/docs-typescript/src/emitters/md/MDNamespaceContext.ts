import { HandlebarsMDContext } from "../Template.js";
import { NamespaceNode } from "../../documenter/api/NamespaceNode.js";

interface MDNamespaceContext {}

function buildMDNamespaceContext(namespaceNode: NamespaceNode): HandlebarsMDContext<MDNamespaceContext> {
	return [{}, "namespace"];
}

export { MDNamespaceContext, buildMDNamespaceContext };

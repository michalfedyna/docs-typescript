import { MethodAttributes } from "../../documenter/api/class/MethodNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";

interface MDMethodContext {
	name: string;
	signature: string;
	docs: MDDocsContext;
}

function buildMDMethodContext(methodAttributes: MethodAttributes): MDMethodContext {
	const { name, signature } = methodAttributes;
	const docs = buildMDDocsContext(methodAttributes.docs);

	return { name, signature, docs };
}

export { MDMethodContext, buildMDMethodContext };

import { IndexSignatureAttributes } from "../../documenter/api/interface/IndexSignatureNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext";

interface MDIndexSignatureContext {
	name: string;
	signature: string;
	isReadonly: boolean;
	params: MDParamsContext;
	returns: MDReturnsContext;
	docs: MDDocsContext;
}

function buildMDIndexSignatureContext(indexSignatureAttributes: IndexSignatureAttributes): MDIndexSignatureContext {
	const { name, signature, isReadonly } = indexSignatureAttributes;
	const docs = buildMDDocsContext(indexSignatureAttributes.docs);
	const returns = buildMDReturnContext(indexSignatureAttributes.returnType, docs.returns);
	const params = buildMDParamsContext(indexSignatureAttributes.parameters);

	return { name, signature, isReadonly, returns, params, docs };
}

export { MDIndexSignatureContext, buildMDIndexSignatureContext };

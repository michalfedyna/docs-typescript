import { ConstructorSignatureAttributes } from "../../documenter/api/interface/ConstructorSignatureNode.js";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext.js";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext.js";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext.js";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext.js";

interface MDConstructorSignatureContext {
	name: string;
	signature: string;
	returns: MDReturnsContext;
	params: MDParamsContext;
	typeParams: MDTypeParamsContext;
	docs: MDDocsContext;
}

function buildMDConstructorSignatureContext(
	constructorSignatureAttributes: ConstructorSignatureAttributes
): MDConstructorSignatureContext {
	const { name, signature } = constructorSignatureAttributes;
	const docs = buildMDDocsContext(constructorSignatureAttributes.docs);
	const returns = buildMDReturnContext(constructorSignatureAttributes.returnType, docs.returns);
	const params = buildMDParamsContext(constructorSignatureAttributes.parameters);
	const typeParams = buildMDTypeParams(constructorSignatureAttributes.typeParameters);

	return { name, signature, returns, params, typeParams, docs };
}

export { MDConstructorSignatureContext, buildMDConstructorSignatureContext };

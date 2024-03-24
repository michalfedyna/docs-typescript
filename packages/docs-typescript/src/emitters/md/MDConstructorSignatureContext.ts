import { ConstructorSignatureAttributes } from "../../documenter/api/interface/ConstructorSignatureNode";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDParamsContext, buildMDParamsContext } from "./MDParamsContext";
import { MDReturnsContext, buildMDReturnContext } from "./MDReturnsContext";
import { MDTypeParamsContext, buildMDTypeParams } from "./MDTypeParamsContext";

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

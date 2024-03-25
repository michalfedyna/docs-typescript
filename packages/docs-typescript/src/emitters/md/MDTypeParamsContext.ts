import { TypeParameters } from "../../documenter/api/ApiAttributes.js";
import { buildDoc } from "./MDDocsContext.js";

type MDTypeParamsContext = {
	name: string;
	isOptional: boolean;
	constraint: string;
	default: string;
	doc?: string[];
}[];

function buildMDTypeParams(typeParams: TypeParameters["typeParameters"]): MDTypeParamsContext {
	return typeParams.map((typeParam) => {
		const { name, isOptional, constraint } = typeParam;
		let doc: string[] | undefined;
		if (typeParam.doc) {
			doc = [];
			typeParam.doc.forEach(buildDoc(doc));
		}

		return {
			name,
			isOptional,
			constraint,
			default: typeParam.default,
			doc
		};
	});
}

export { MDTypeParamsContext, buildMDTypeParams };

import { TypeParameters } from "../../documenter/api/ApiAttributes";
import { buildDoc } from "./MDDocsContext";

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

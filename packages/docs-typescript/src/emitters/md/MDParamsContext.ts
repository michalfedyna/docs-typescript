import { Parameters } from "../../documenter/api/ApiAttributes";
import { buildDoc } from "./MDDocsContext";

type MDParamsContext = {
	name: string;
	type: string;
	isOptional: boolean;
	doc?: string[];
}[];

function buildMDParamsContext(params: Parameters["parameters"]): MDParamsContext {
	return params.map((param) => {
		const { name, type, isOptional } = param;
		let doc: string[] | undefined;
		if (param.doc) {
			doc = [];
			param.doc.forEach(buildDoc(doc));
		}

		return {
			name,
			type,
			isOptional,
			doc
		};
	});
}

export { MDParamsContext, buildMDParamsContext };

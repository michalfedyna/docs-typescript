import { Parameters } from "../../documenter/api/ApiAttributes";
import { buildDoc } from "./MarkdownDocsContext";

type MarkdownParamsContext = {
	name: string;
	type: string;
	isOptional: boolean;
	doc?: string[];
}[];

function buildMarkdownParamsContext(params: Parameters["parameters"]): MarkdownParamsContext {
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

export { MarkdownParamsContext, buildMarkdownParamsContext };

import { Returns } from "../../documenter/api/ApiAttributes";

interface MarkdownReturnsContext {
	returnType: string;
	doc?: string[];
}

function buildMarkdownReturnContext(returnType: Returns["returnType"], doc?: string[]): MarkdownReturnsContext {
	return {
		returnType,
		doc
	};
}

export { MarkdownReturnsContext, buildMarkdownReturnContext };

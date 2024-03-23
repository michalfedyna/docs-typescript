import { Returns } from "../../documenter/api/ApiAttributes";

interface MDReturnsContext {
	returnType: string;
	doc?: string[];
}

function buildMDReturnContext(returnType: Returns["returnType"], doc?: string[]): MDReturnsContext {
	return {
		returnType,
		doc
	};
}

export { MDReturnsContext, buildMDReturnContext };

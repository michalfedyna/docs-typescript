import { DocWriter } from "./DocsWriter";

interface DocsSummary {
	content: DocWriter;
}

interface DocsRemarks {}

interface DocsReturns {}

interface DocsDeprecated {}

interface DocsTypeParams {}

interface DocsSee {}

interface DocsParam {}

interface DocsDefaultValue {}

interface DocsExample {
	name: string;
	language: string;
	lines: string[];
}

interface DocsAttributes {
	summary?: DocsSummary;
	remarks?: DocsRemarks;
	returns?: DocsReturns;
	deprecated?: DocsDeprecated;
	typeParams?: DocsTypeParams;
	see?: DocsSee;
	defaultValue?: DocsDefaultValue;
	params?: DocsParam[];
	examples?: DocsExample[];
}

export type {
	DocsAttributes,
	DocsSummary,
	DocsRemarks,
	DocsReturns,
	DocsDeprecated,
	DocsTypeParams,
	DocsSee,
	DocsParam,
	DocsDefaultValue,
	DocsExample
};

import { DocWriter } from "./DocsWriter";

interface DocsSummary {
	content: DocWriter;
}

interface DocsRemarks {
	content: DocWriter;
}

interface DocsReturns {
	content: DocWriter;
}

interface DocsDeprecated {
	content: DocWriter;
}

interface DocsTypeParams {
	name: string;
	content: DocWriter;
}

interface DocsSee {
	content: DocWriter;
}

interface DocsParam {
	name: string;
	content: DocWriter;
}

interface DocsDefaultValue {
	content: DocWriter;
}

interface DocsExample {
	name: string;
	content: DocWriter;
}

interface DocsAttributes {
	summary?: DocsSummary;
	remarks?: DocsRemarks;
	returns?: DocsReturns;
	deprecated?: DocsDeprecated;
	defaultValue?: DocsDefaultValue;
	typeParams?: DocsTypeParams[];
	see?: DocsSee[];
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

import { DocWriter } from "./DocsWriter";

interface DocsSummary {
	content: string;
}

interface DocsRemarks {
	content: string;
}

interface DocsReturns {
	content: string;
}

interface DocsDeprecated {
	content: string;
}

interface DocsTypeParams {
	name: string;
	content: string;
}

interface DocsSee {
	content: string;
}

interface DocsParam {
	name: string;
	content: string;
}

interface DocsDefaultValue {
	content: string;
}

interface DocsExample {
	name: string;
	content: string;
}

interface DocsSince {
	content: string;
}

interface DocsInfo {
	content: string;
}

interface DocsWarning {
	content: string;
}

interface DocsError {
	content: string;
}

interface DocsAuthor {
	content: string;
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
	since?: DocsSince[];
	infos?: DocsInfo[];
	warnings?: DocsWarning[];
	errors?: DocsError[];
	authors?: DocsAuthor[];
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
	DocsExample,
	DocsSince,
	DocsInfo,
	DocsWarning,
	DocsError,
	DocsAuthor
};

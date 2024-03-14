import type {
	DocsSummary,
	DocsRemarks,
	DocsReturns,
	DocsDeprecated,
	DocsTypeParams,
	DocsSee,
	DocsParam,
	DocsDefaultValue,
	DocsExample,
	DocsAttributes,
	DocsSince,
	DocsInfo,
	DocsWarning,
	DocsError,
	DocsAuthor
} from "./DocsItemAttributes";

class DocsItem implements DocsAttributes {
	public summary?: DocsSummary;
	public remarks?: DocsRemarks;
	public returns?: DocsReturns;
	public deprecated?: DocsDeprecated;
	public typeParams?: DocsTypeParams[];
	public see?: DocsSee[];
	public defaultValue?: DocsDefaultValue;
	public params?: DocsParam[];
	public examples?: DocsExample[];
	public since?: DocsSince[];
	public infos?: DocsInfo[];
	public warnings?: DocsWarning[];
	public errors?: DocsError[];
	public authors?: DocsAuthor[];

	constructor(attributes: DocsAttributes) {
		this.summary = attributes.summary;
		this.remarks = attributes.remarks;
		this.returns = attributes.returns;
		this.deprecated = attributes.deprecated;
		this.typeParams = attributes.typeParams;
		this.see = attributes.see;
		this.defaultValue = attributes.defaultValue;
		this.params = attributes.params;
		this.examples = attributes.examples;
		this.since = attributes.since;
		this.infos = attributes.infos;
		this.warnings = attributes.warnings;
		this.errors = attributes.errors;
		this.authors = attributes.authors;
	}

	public toObject(): object {
		return {
			summary: this.summary,
			remarks: this.remarks,
			returns: this.returns,
			deprecated: this.deprecated,
			typeParams: this.typeParams,
			see: this.see,
			defaultValue: this.defaultValue,
			params: this.params,
			examples: this.examples,
			since: this.since,
			infos: this.infos,
			warnings: this.warnings,
			errors: this.errors,
			authors: this.authors
		};
	}
}

export { DocsItem, DocsAttributes };

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
	DocsAttributes
} from "./DocsItemAttributes";

class DocsItem {
	public summary?: DocsSummary;
	public remarks?: DocsRemarks;
	public returns?: DocsReturns;
	public deprecated?: DocsDeprecated;
	public typeParams?: DocsTypeParams[];
	public see?: DocsSee[];
	public defaultValue?: DocsDefaultValue;
	public params?: DocsParam[];
	public examples?: DocsExample[];

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
			examples: this.examples
		};
	}
}

export { DocsItem, DocsAttributes };

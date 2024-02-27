interface DocsSummary {}

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

class DocsItem {
	protected _summary?: DocsSummary;
	protected _remarks?: DocsRemarks;
	protected _returns?: DocsReturns;
	protected _deprecated?: DocsDeprecated;
	protected _typeParams?: DocsTypeParams;
	protected _see?: DocsSee;
	protected _defaultValue?: DocsDefaultValue;
	protected _params?: DocsParam[];
	protected _examples?: DocsExample[];

	constructor(attributes: DocsAttributes) {
		this._summary = attributes.summary;
		this._remarks = attributes.remarks;
		this._returns = attributes.returns;
		this._deprecated = attributes.deprecated;
		this._typeParams = attributes.typeParams;
		this._see = attributes.see;
		this._defaultValue = attributes.defaultValue;
		this._params = attributes.params;
		this._examples = attributes.examples;
	}

	public get summary(): DocsSummary | undefined {
		return this._summary;
	}

	public get remarks(): DocsRemarks | undefined {
		return this._remarks;
	}

	public get returns(): DocsReturns | undefined {
		return this._returns;
	}

	public get deprecated(): DocsDeprecated | undefined {
		return this._deprecated;
	}

	public get typeParams(): DocsTypeParams | undefined {
		return this._typeParams;
	}

	public get see(): DocsSee | undefined {
		return this._see;
	}

	public get defaultValue(): DocsDefaultValue | undefined {
		return this._defaultValue;
	}

	public get params(): DocsParam[] | undefined {
		return this._params;
	}

	public get examples(): DocsExample[] | undefined {
		return this._examples;
	}

	public toObject(): object {
		return {
			summary: this._summary,
			remarks: this._remarks,
			returns: this._returns,
			deprecated: this._deprecated,
			typeParams: this._typeParams,
			see: this._see,
			defaultValue: this._defaultValue,
			params: this._params,
			examples: this._examples
		};
	}
}

export { DocsItem, DocsAttributes };

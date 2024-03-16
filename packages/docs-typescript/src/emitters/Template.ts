import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { DocsAttributes } from "../documenter/docs/DocsAttributes";
import { VariableAttributes } from "../documenter/api/VariableNode";
import { FunctionAttributes } from "../documenter/api/FunctionNode";

interface ApiContext<T> {
	attributes: T;
	docs: DocsAttributes;
}

type Formats = "markdown";

type ApiNodes = "variable" | "function";

type Templates = {
	[K in Formats]: {
		[K in ApiNodes]: string | ApiContext<any>;
	};
};

interface Contexts extends Templates {
	markdown: {
		variable: ApiContext<VariableAttributes>;
		function: ApiContext<FunctionAttributes>;
	};
}

const TemplatesPath: Templates = {
	markdown: {
		variable: "markdown/variable.hbs",
		function: "markdown/function.hbs"
	}
};

type FormatKeys = keyof Templates;
type TemplateKeys<T extends FormatKeys> = keyof Templates[T];

type TemplatesPath<T extends FormatKeys, U extends TemplateKeys<T>> = Templates[T][U];
type ContextsValues<T extends FormatKeys, U extends TemplateKeys<T>> = Contexts[T][U];

class Template<
	T extends TemplatesPath<U, V>,
	K extends ContextsValues<U, V>,
	U extends FormatKeys,
	V extends TemplateKeys<U>
> {
	protected _handlebars: typeof Handlebars = Handlebars;

	constructor(
		protected _format: U,
		protected _template: V
	) {
		this._handlebars = Handlebars.create();

		for (const template in TemplatesPath[this._format]) {
			const templateDelegate = this._loadTemplate(TemplatesPath[this._format][template] as T);
			this._handlebars.registerPartial(template, templateDelegate);
		}
	}

	public render(context: K): string {
		const template = this._loadTemplate(TemplatesPath[this._format][this._template] as T);
		return template(context);
	}

	protected _loadTemplate(templatePath: T): TemplateDelegate<K> {
		const filePath = path.resolve(__dirname, "../" + "templates/" + templatePath);

		if (!fs.existsSync(filePath)) {
			throw new Error(`Template not found: ${filePath}`);
		}

		const file = fs.readFileSync(filePath, "utf-8");
		return this._handlebars.compile(file);
	}
}

export { Template };

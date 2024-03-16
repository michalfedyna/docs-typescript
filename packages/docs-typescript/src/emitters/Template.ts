import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { DocsAttributes } from "../documenter/docs/DocsAttributes";
import { VariableContext } from "./context/VariableContext";
import { FunctionContext } from "./context/FunctionContext";

type Formats = "markdown";

type HandlebarsTemplates = "docs" | "variable" | "function";

type HandlebarsContext<T> = [T, HandlebarsTemplates];

type Templates<T = unknown> = {
	[K in Formats]: {
		[K in HandlebarsTemplates]: T;
	};
};

interface Contexts extends Templates {
	markdown: {
		docs: DocsAttributes;
		variable: VariableContext;
		function: FunctionContext;
	};
}

const TemplatesPath: Templates<string> = {
	markdown: {
		docs: "markdown/docs.hbs",
		variable: "markdown/variable.hbs",
		function: "markdown/function.hbs"
	}
};

type FormatKeys = keyof Templates;
type TemplateKeys<T extends FormatKeys> = keyof Templates[T];

type TemplatesPath<T extends FormatKeys, U extends TemplateKeys<T>> = Templates<string>[T][U];
type ContextsValues<T extends FormatKeys, U extends TemplateKeys<T>> = Contexts[T][U];

class Template<
	T extends TemplatesPath<U, V>,
	K extends ContextsValues<U, V>,
	U extends FormatKeys,
	V extends TemplateKeys<U>
> {
	public handlebars: typeof Handlebars = Handlebars;

	constructor(
		public format: U,
		public template: V
	) {
		this.handlebars = Handlebars.create();

		for (const template in TemplatesPath[this.format]) {
			const templateDelegate = this._loadTemplate(TemplatesPath[this.format][template] as T);
			this.handlebars.registerPartial(template, templateDelegate);
		}
	}

	public render(context: K): string {
		const template = this._loadTemplate(TemplatesPath[this.format][this.template] as T);
		return template(context);
	}

	protected _loadTemplate(templatePath: T): TemplateDelegate<K> {
		const filePath = path.resolve(__dirname, "../" + "templates/" + templatePath);

		if (!fs.existsSync(filePath)) {
			throw new Error(`Template not found: ${filePath}`);
		}

		const file = fs.readFileSync(filePath, "utf-8");
		return this.handlebars.compile(file);
	}
}

export { Template, HandlebarsContext };

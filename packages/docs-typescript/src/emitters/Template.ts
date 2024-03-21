import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { MarkdownVariableContext } from "./markdown/MarkdownVariableContext";
import { MarkdownFunctionContext } from "./markdown/MarkdownFunctionContext";
import { MarkdownPackageContext } from "./markdown/MarkdownPackageContext";
import { MarkdownMembersContext } from "./markdown/MarkdownMembersContext";
import { MarkdownNamespaceContext } from "./markdown/MarkdownNamespaceContext";
import { MarkdownDocsContext } from "./markdown/MarkdownDocsContext";
import { MarkdownParamsContext } from "./markdown/MarkdownParamsContext";
import { MarkdownTypeParamsContext } from "./markdown/MarkdownTypeParamsContext";

type HandlebarsMarkdownTemplates =
	| "signature"
	| "docs"
	| "summary"
	| "remarks"
	| "params"
	| "typeParams"
	| "examples"
	| "members"
	| "package"
	| "namespace"
	| "variable"
	| "function";

type HandlebarsMarkdownContext<T> = [T, HandlebarsMarkdownTemplates];

type Templates<T = unknown> = {
	markdown: {
		[K in HandlebarsMarkdownTemplates]: T;
	};
};

interface Contexts extends Templates {
	markdown: {
		// Docs Helpers
		docs: MarkdownDocsContext;
		summary: MarkdownDocsContext["summary"];
		remarks: MarkdownDocsContext["remarks"];
		examples: MarkdownDocsContext["examples"];
		members: MarkdownMembersContext;
		// Api Helpers
		signature: string;
    // TODO: Change to parameters
		params: MarkdownParamsContext;
		typeParams: MarkdownTypeParamsContext;
		// API
		package: MarkdownPackageContext;
		namespace: MarkdownNamespaceContext;
		variable: MarkdownVariableContext;
		function: MarkdownFunctionContext;
	};
}

const TemplatesPath: Templates<string> = {
	markdown: {
		// Docs Helpers
		signature: "markdown/signature.hbs",
		docs: "markdown/docs.hbs",
		summary: "markdown/summary.hbs",
		remarks: "markdown/remarks.hbs",
		examples: "markdown/examples.hbs",
		members: "markdown/members.hbs",
		// Api Helpers
		params: "markdown/params.hbs",
		typeParams: "markdown/typeParams.hbs",
		// API
		package: "markdown/package.hbs",
		namespace: "markdown/namespace.hbs",
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

export { Template, HandlebarsMarkdownContext };

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
import { MarkdownReturnsContext } from "./markdown/MarkdownReturnsContext";
import { MarkdownTypeAliasContext } from "./markdown/MarkdownTypeAliasContext";
import { MarkdownEnumContext } from "./markdown/MarkdownEnumContxt";
import { MarkdownEnumMembersContext } from "./markdown/MarkdownEnumMembersContext";
import { MarkdownClassContext } from "./markdown/MarkdownClassContext";

type HandlebarsMarkdownTemplates =
	| "signature"
	| "docs"
	| "summary"
	| "remarks"
	| "returns"
	| "params"
	| "typeParams"
	| "enumMembers"
	| "examples"
	| "members"
	| "package"
	| "namespace"
	| "class"
	| "variable"
	| "function"
	| "typeAlias"
	| "enum";

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
		params: MarkdownParamsContext;
		typeParams: MarkdownTypeParamsContext;
		returns: MarkdownReturnsContext;
		enumMembers: MarkdownEnumMembersContext;
		// API
		package: MarkdownPackageContext;
		namespace: MarkdownNamespaceContext;
		class: MarkdownClassContext;
		variable: MarkdownVariableContext;
		function: MarkdownFunctionContext;
		typeAlias: MarkdownTypeAliasContext;
		enum: MarkdownEnumContext;
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
		returns: "markdown/returns.hbs",
		enumMembers: "markdown/enumMembers.hbs",
		// API
		package: "markdown/package.hbs",
		namespace: "markdown/namespace.hbs",
    class: "markdown/class.hbs",
		variable: "markdown/variable.hbs",
		function: "markdown/function.hbs",
		typeAlias: "markdown/typeAlias.hbs",
		enum: "markdown/enum.hbs"
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

import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { MDVariableContext } from "./md/MDVariableContext";
import { MDFunctionContext } from "./md/MDFunctionContext";
import { MDPackageContext } from "./md/MDPackageContext";
import { MDMembersContext } from "./md/MDMembersContext";
import { MDNamespaceContext } from "./md/MDNamespaceContext";
import { MDDocsContext } from "./md/MDDocsContext";
import { MDParamsContext } from "./md/MDParamsContext";
import { MDTypeParamsContext } from "./md/MDTypeParamsContext";
import { MDReturnsContext } from "./md/MDReturnsContext";
import { MDTypeAliasContext } from "./md/MDTypeAliasContext";
import { MDEnumContext } from "./md/MDEnumContext";
import { MDEnumMembersContext } from "./md/MDEnumMembersContext";
import { MDClassContext } from "./md/MDClassContext";
import { MDConstructorContext } from "./md/MDConstructorContext";
import { MDPropertyContext } from "./md/MDPropertyContext";
import { MDMethodContext } from "./md/MDMethodContext";

type HandlebarMDTemplates =
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
	| "constructor"
	| "property"
	| "method"
	| "variable"
	| "function"
	| "typeAlias"
	| "enum";

type HandlebarsMDContext<T> = [T, HandlebarMDTemplates];

type Templates<T = unknown> = {
	markdown: {
		[K in HandlebarMDTemplates]: T;
	};
};

interface Contexts extends Templates {
	markdown: {
		// Docs Helpers
		docs: MDDocsContext;
		summary: MDDocsContext["summary"];
		remarks: MDDocsContext["remarks"];
		examples: MDDocsContext["examples"];
		members: MDMembersContext;
		// Api Helpers
		signature: string;
		params: MDParamsContext;
		typeParams: MDTypeParamsContext;
		returns: MDReturnsContext;
		enumMembers: MDEnumMembersContext;
		// API
		package: MDPackageContext;
		namespace: MDNamespaceContext;
		class: MDClassContext;
		constructor: MDConstructorContext;
		property: MDPropertyContext;
		method: MDMethodContext;
		variable: MDVariableContext;
		function: MDFunctionContext;
		typeAlias: MDTypeAliasContext;
		enum: MDEnumContext;
	};
}

const TemplatesPath: Templates<string> = {
	markdown: {
		// Docs Helpers
		signature: "md/signature.hbs",
		docs: "md/docs.hbs",
		summary: "md/summary.hbs",
		remarks: "md/remarks.hbs",
		examples: "md/examples.hbs",
		members: "md/members.hbs",
		// Api Helpers
		params: "md/params.hbs",
		typeParams: "md/typeParams.hbs",
		returns: "md/returns.hbs",
		enumMembers: "md/enumMembers.hbs",
		// API
		package: "md/package.hbs",
		namespace: "md/namespace.hbs",
		class: "md/class.hbs",
		constructor: "md/constructor.hbs",
		property: "md/property.hbs",
		method: "md/method.hbs",
		variable: "md/variable.hbs",
		function: "md/function.hbs",
		typeAlias: "md/typeAlias.hbs",
		enum: "md/enum.hbs"
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

export { Template, HandlebarsMDContext };

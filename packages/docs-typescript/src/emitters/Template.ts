import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import Handlebars from "handlebars";

import { MDVariableContext } from "./md/MDVariableContext.js";
import { MDFunctionContext } from "./md/MDFunctionContext.js";
import { MDPackageContext } from "./md/MDPackageContext.js";
import { MDPackageMembersContext } from "./md/MDPackageMembersContext.js";
import { MDNamespaceContext } from "./md/MDNamespaceContext.js";
import { MDDocsContext } from "./md/MDDocsContext.js";
import { MDParamsContext } from "./md/MDParamsContext.js";
import { MDTypeParamsContext } from "./md/MDTypeParamsContext.js";
import { MDReturnsContext } from "./md/MDReturnsContext.js";
import { MDTypeAliasContext } from "./md/MDTypeAliasContext.js";
import { MDEnumContext } from "./md/MDEnumContext.js";
import { MDEnumMembersContext } from "./md/MDEnumMembersContext.js";
import { MDClassContext } from "./md/MDClassContext.js";
import { MDConstructorContext } from "./md/MDConstructorContext.js";
import { MDPropertyContext } from "./md/MDPropertyContext.js";
import { MDMethodContext } from "./md/MDMethodContext.js";
import { MDInterfaceContext } from "./md/MDInterfaceContext.js";
import { MDIndexSignatureContext } from "./md/MDIndexSignatureContext.js";
import { MDConstructorSignatureContext } from "./md/MDConstructorSignatureContext.js";
import { MDPropertySignatureContext } from "./md/MDPropertySignatureContext.js";
import { MDMethodSignatureContext } from "./md/MDMethodSignatureContext.js";

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
	| "packageMembers"
	| "package"
	| "namespace"
	| "class"
	| "constructor"
	| "property"
	| "method"
	| "variable"
	| "function"
	| "typeAlias"
	| "enum"
	| "interface"
	| "indexSignature"
	| "constructorSignature"
	| "propertySignature"
	| "methodSignature";

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
		packageMembers: MDPackageMembersContext;
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
		interface: MDInterfaceContext;
		indexSignature: MDIndexSignatureContext;
		constructorSignature: MDConstructorSignatureContext;
		propertySignature: MDPropertySignatureContext;
		methodSignature: MDMethodSignatureContext;
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
		packageMembers: "md/packageMembers.hbs",
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
		enum: "md/enum.hbs",
		interface: "md/interface.hbs",
		indexSignature: "md/indexSignature.hbs",
		constructorSignature: "md/constructorSignature.hbs",
		propertySignature: "md/propertySignature.hbs",
		methodSignature: "md/methodSignature.hbs"
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

	protected _loadTemplate(templatePath: T): Handlebars.TemplateDelegate<K> {
		const __filename = fileURLToPath(import.meta.url);

		const __dirname = path.dirname(__filename);
		const filePath = path.resolve(__dirname, "../" + "templates/" + templatePath);

		if (!fs.existsSync(filePath)) {
			throw new Error(`Template not found: ${filePath}`);
		}

		const file = fs.readFileSync(filePath, "utf-8");
		return this.handlebars.compile(file);
	}
}

export { Template, HandlebarsMDContext };

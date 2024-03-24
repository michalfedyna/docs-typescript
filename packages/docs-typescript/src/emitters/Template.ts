import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { MDVariableContext } from "./md/MDVariableContext";
import { MDFunctionContext } from "./md/MDFunctionContext";
import { MDPackageContext } from "./md/MDPackageContext";
import { MDPackageMembersContext } from "./md/MDPackageMembersContext";
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
import { MDInterfaceContext } from "./md/MDInterfaceContext";
import { MDIndexSignatureContext } from "./md/MDIndexSignatureContext";
import { MDConstructorSignatureContext } from "./md/MDConstructorSignatureContext";
import { MDPropertySignatureContext } from "./md/MDPropertySignatureContext";
import { MDMethodSignatureContext } from "./md/MDMethodSignatureContext";

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

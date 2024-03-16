import * as fs from "fs";
import path from "path";

import Handlebars, { TemplateDelegate } from "handlebars";
import { VariableContext, VariableTemplatePath } from "../templates/markdown/variable";

const Templates = {
	markdown: {
		variable: VariableTemplatePath
	}
};

type FormatKeys = keyof typeof Templates;
type TemplateKeys<T extends FormatKeys> = keyof (typeof Templates)[T];

class Template<T, U extends FormatKeys, V extends TemplateKeys<U>> {
	protected _handlebars: typeof Handlebars = Handlebars;

	constructor(
		protected _format: U,
		protected _template: V
	) {
		this._handlebars = Handlebars.create();

		for (const template in Templates[this._format]) {
			const templateDelegate = this._loadTemplate(Templates[this._format][template] as string);
			this._handlebars.registerPartial(template, templateDelegate);
		}
	}

	public render(context: T): string {
		const template = this._loadTemplate<T>(Templates[this._format][this._template] as string);
		return template(context);
	}

	protected _loadTemplate<T>(templatePath: string): TemplateDelegate<T> {
		const filePath = path.resolve(__dirname, "../" + "templates/" + templatePath);

		if (!fs.existsSync(filePath)) {
			throw new Error(`Template not found: ${filePath}`);
		}

		const file = fs.readFileSync(filePath, "utf-8");
		return this._handlebars.compile(file);
	}
}

export { Template };

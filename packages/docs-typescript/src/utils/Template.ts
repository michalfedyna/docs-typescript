import Handlebars, { TemplateDelegate } from "handlebars";
import { ClassTemplate } from "../templates/markdown/class";
import { ConstructorTemplate } from "../templates/markdown/constructor";

const Templates = {
	markdown: {
		class: ClassTemplate,
		constructor: ConstructorTemplate
	}
};

type FormatKeys = keyof typeof Templates;
type TemplateKeys<T extends FormatKeys> = keyof (typeof Templates)[T];
type TemplateValues<T extends FormatKeys, U extends TemplateKeys<T>> = (typeof Templates)[T][U];

class Template<T extends TemplateValues<U, V>, U extends FormatKeys, V extends TemplateKeys<U>> {
	constructor(
		protected _format: U,
		protected _template: V
	) {
		for (const template in Templates[this._format]) {
			Handlebars.registerPartial(template, Templates[this._format][template] as TemplateDelegate);
		}
	}

	// TODO: Fix typescript error of Parameters<T>[0]
	// @ts-ignore
	public render(context: Parameters<T>[0]): string {
		const template = Templates[this._format][this._template] as TemplateDelegate<typeof context> | undefined;
		if (!template) {
			throw new Error(`Template not found: ${this._format}.${String(this._template)}`);
		}
		return template(context);
	}
}

export { Template };

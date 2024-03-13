import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

import { Config } from "../config/DocsConfig";

class Template {
	constructor(
		protected _format: Required<Config["outputFormat"]>,
		protected _template: string
	) {}

	public render(context: object): string {
		const templatePath = fs.readFileSync(
			path.resolve(__dirname, `../templates/${this._format}/${this._template}.hbs`),
			"utf-8"
		);
		const template = Handlebars.compile(templatePath);
		return template(context);
	}
}

export { Template };

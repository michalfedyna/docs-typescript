import { Command } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import shell from "shelljs";

import { Debug } from "../../utils/Debug.js";

function init(cli: Command) {
	cli.command("init").description("Generates documentation for entire project").action(action(cli));
}

function action(cli: Command) {
	return function () {
		const options = cli.opts();

		if (options.verbose) {
			Debug.enable();
		}

		const cwd = process.cwd();
		const outputFolder: string = path.resolve(cwd);
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const templateFolder: string = path.resolve(__dirname, "../../templates/config");

		Debug.log("Copying template files to docs folder");
		Debug.log("Template folder", templateFolder);
		Debug.log("Output folder", outputFolder);

		const apiExtractorFilePath: string = path.resolve(templateFolder, "api-extractor.json");
		const tsDocFilePath: string = path.resolve(templateFolder, "tsdoc.json");
		const docsConfigFilePath: string = path.resolve(templateFolder, "docs.config.json");

		Debug.log("Copying files");
		Debug.log("api-extractor.json", apiExtractorFilePath);
		Debug.log("tsdoc.json", tsDocFilePath);
		Debug.log("docs.config.json", docsConfigFilePath);

		shell.cp(apiExtractorFilePath, `${outputFolder}/api-extractor.json`);
		shell.cp(tsDocFilePath, `${outputFolder}/tsdoc.json`);
		shell.cp(docsConfigFilePath, `${cwd}/docs.config.json`);
	};
}

export default init;

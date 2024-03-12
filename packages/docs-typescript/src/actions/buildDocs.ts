import { DocsConfig } from "../config/DocsConfig";
import path from "path";
import { ApiModel } from "@microsoft/api-extractor-model";
import { Documenter } from "../documenter/Documenter";

function buildDocs(config: DocsConfig) {
	const cwd = process.cwd();

	const pathToApiJson = path.resolve(cwd, config.api);
	const apiModel = new ApiModel();

	apiModel.loadPackage(pathToApiJson);

	const documenter = new Documenter(apiModel, config);
	documenter.emit();
}

export { buildDocs };

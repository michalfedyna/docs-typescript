import { DocsConfig } from "../../config/DocsConfig.js";
import path from "path";
import { ApiModel } from "@microsoft/api-extractor-model";
import { Documenter } from "../../documenter/Documenter.js";
import { Debug } from "../../utils/Debug.js";

function buildDocs(config: DocsConfig) {
	const cwd = process.cwd();

	const pathToApiJson = path.resolve(cwd, config.apiJsonPath);

	Debug.log("Loading api model from", pathToApiJson);

	const apiModel = new ApiModel();

	apiModel.loadPackage(pathToApiJson);

	const documenter = new Documenter(apiModel, config);
	documenter.emit();
}

export { buildDocs };

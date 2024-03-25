import { DocsConfig } from "../../config/DocsConfig.js";
import path from "path";
import { Documenter } from "../../documenter/Documenter.js";
import { Debug } from "../../utils/Debug.js";
import { ApiModelProvider } from "../../documenter/ApiModelProvider.js";

function buildDocs(config: DocsConfig) {
	const cwd = process.cwd();
	const pathToApiJson = path.resolve(cwd, config.apiJsonPath);

	Debug.log("Loading api model from", pathToApiJson);

	const apiModel = ApiModelProvider.getInstance().loadPackage(pathToApiJson);

	const documenter = new Documenter(apiModel, config);
	documenter.emit();
}

export { buildDocs };

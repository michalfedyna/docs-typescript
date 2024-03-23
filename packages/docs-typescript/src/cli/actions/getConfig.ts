import path from "path";
import * as fs from "fs";

import { Config, DocsConfig } from "../../config/DocsConfig";
import { Debug } from "../../utils/Debug";

function getConfig(): DocsConfig {
	const configPath = path.resolve(process.cwd(), "docs.config.json");
	const configFile = fs.readFileSync(configPath, "utf-8");
	const configObject: Config = JSON.parse(configFile);

	Debug.log("Config file", configObject);

	if (!configObject.apiJsonPath) {
		console.error("No api configuration found in docs.config.json");
		process.exit(1);
	}

	const config = new DocsConfig(configObject);

	Debug.log("Config loaded", config);

	return config;
}

export { getConfig };

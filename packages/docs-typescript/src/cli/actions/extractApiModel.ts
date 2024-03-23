import path from "path";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";

function extractApiModel() {
	const cwd = process.cwd();
	const apiExtractorJsonPath = path.resolve(cwd, "api-extractor.json");
	const tsDocConfigPath = path.resolve(cwd, "tsdoc.json");

	try {
		const configObject = ExtractorConfig.loadFile(apiExtractorJsonPath);
		const tsDocConfig = TSDocConfigFile.loadFile(tsDocConfigPath);
		const extractorConfig = ExtractorConfig.prepare({
			configObject,
			configObjectFullPath: apiExtractorJsonPath,
			packageJsonFullPath: path.resolve(cwd, "package.json"),
			tsdocConfigFile: tsDocConfig
		});

		const extractorResult = Extractor.invoke(extractorConfig, {
			localBuild: true,
			showVerboseMessages: true
		});

		if (extractorResult.succeeded) {
			console.log("API Extractor completed successfully");
			return;
		} else {
			console.error(
				`API Extractor completed with ${extractorResult.errorCount} errors` +
					` and ${extractorResult.warningCount} warnings`
			);
			process.exit(1);
		}
	} catch (e) {
		console.error("Error loading api-extractor.json");
		console.error(e);
		process.exit(1);
	}
}

export { extractApiModel };

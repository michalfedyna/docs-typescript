import { Command } from "commander";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import path from "path";
import shell from "shelljs";
import { ApiModel } from "@microsoft/api-extractor-model";

import { Documenter } from "../../documenter/Documenter";

function extract(cli: Command) {
  cli
    .command("extract")
    .description("Extracts all the types from the project")
    .action(action);

  return cli;
}

function action() {
  console.log("Extracting API model...");
  generateDeclarations();
  extractApiModel();
  buildDocs();
}

function buildDocs() {
  const cwd = process.cwd();
  const pathToApiJson = path.resolve(cwd, "docs/declarations/api.json");
  const apiModel = new ApiModel();
  apiModel.loadPackage(pathToApiJson);

  const documenter = new Documenter(apiModel);
  documenter.buildHierarchy();
}

function generateDeclarations() {
  shell.exec(`tsc --project docs/config/tsconfig.docs.json`);
}

function extractApiModel() {
  const cwd = process.cwd();
  const apiExtractorJsonPath = path.resolve(
    cwd,
    "docs/config/api-extractor.json",
  );
  console.log(`Loading ${apiExtractorJsonPath}...`);

  try {
    const extractorConfig =
      ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
    });

    if (extractorResult.succeeded) {
      console.log("API Extractor completed successfully");
      return;
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`,
      );
      process.exit(1);
    }
  } catch (e) {
    console.error("Error loading api-extractor.json");
    console.error(e);
    process.exit(1);
  }
}

export default extract;

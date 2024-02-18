import { Command } from "commander";
import path from "path";
import shell from "shelljs";
import { ExtractorConfig } from "@microsoft/api-extractor";

function init(cli: Command) {
  cli
    .command("init")
    .description("Generates documentation for entire project")
    .action(action);
}

function action() {
  const cwd = process.cwd();
  const outputFolder: string = path.resolve(cwd, "docs/config/");

  const apiExtractorFilePath: string = path.resolve(
    __dirname,
    "../../templates/api-extractor.json",
  );
  const tsConfigFilePath: string = path.resolve(
    __dirname,
    "../../templates/tsconfig.docs.json",
  );
  const tsDocFilePath: string = path.resolve(
    __dirname,
    "../../templates/tsdoc.json",
  );
  const docsConfigFilePath: string = path.resolve(
    __dirname,
    "../../templates/docs.config.json",
  );

  shell.mkdir(["docs", "docs/config"]);

  shell.cp(apiExtractorFilePath, `${outputFolder}/api-extractor.json`);
  shell.cp(tsConfigFilePath, `${outputFolder}/tsconfig.docs.json`);
  shell.cp(tsDocFilePath, `${outputFolder}/tsdoc.json`);
  shell.cp(docsConfigFilePath, `${cwd}/docs.config.json`);
  shell.exec("npx create-docusaurus@latest website classic docs --typescript");
}

export default init;

import { DocsConfig } from "../config/DocsConfig";
import { buildApiModel } from "./buildApiModel";

function buildDocs(
  inputFiles: string[],
  outputFolder: string,
  config: DocsConfig,
) {
  const apiModel = buildApiModel(inputFiles);

  console.log("apiModel.kind:", apiModel.kind);
}

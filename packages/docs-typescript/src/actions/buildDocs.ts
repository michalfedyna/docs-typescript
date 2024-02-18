import { BuildConfig } from "../config/BuildConfig";
import { buildApiModel } from "./buildApiModel";

function buildDocs(
  inputFiles: string[],
  outputFolder: string,
  config: BuildConfig,
) {
  const apiModel = buildApiModel(inputFiles);

  console.log("apiModel.kind:", apiModel.kind);
}

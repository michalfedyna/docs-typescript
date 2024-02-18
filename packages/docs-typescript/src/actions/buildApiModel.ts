import { ApiModel } from "@microsoft/api-extractor-model";

function buildApiModel(inputFiles: string[]): ApiModel {
  const apiModel = new ApiModel();

  for (const inputFilename of inputFiles) {
    apiModel.loadPackage(inputFilename);
  }

  return apiModel;
}

export { buildApiModel };

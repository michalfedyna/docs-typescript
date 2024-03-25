import { ApiItem, ApiModel } from "@microsoft/api-extractor-model";
import { DocDeclarationReference } from "@microsoft/tsdoc";
import { DeclarationReference } from "@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference.js";

class ApiModelProvider {
	protected static instance: ApiModelProvider;

	protected apiModel: ApiModel;

	protected constructor() {
		this.apiModel = new ApiModel();
	}

	static getInstance() {
		if (ApiModelProvider.instance) {
			return ApiModelProvider.instance;
		}

		ApiModelProvider.instance = new ApiModelProvider();
		return ApiModelProvider.instance;
	}

	public loadPackage(path: string) {
		this.apiModel.loadPackage(path);
		return this.apiModel;
	}

	public resolveDeclarationReference(
		declarationReference: DocDeclarationReference | DeclarationReference | undefined,
		contextApiItem?: ApiItem
	) {
		if (declarationReference === undefined) return;

		return this.apiModel.resolveDeclarationReference(declarationReference, contextApiItem);
	}
}

export { ApiModelProvider };

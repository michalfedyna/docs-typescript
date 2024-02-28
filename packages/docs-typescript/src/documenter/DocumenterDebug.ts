import { ApiDocumentedItem, ApiItem, ApiModel } from "@microsoft/api-extractor-model";
import { DocExcerpt, DocNode } from "@microsoft/tsdoc";

class DocumenterDebug {
	private readonly _apiModel: ApiModel;

	constructor(apiModel: ApiModel) {
		this._apiModel = apiModel;
	}

	public buildHierarchy(): void {
		this._enumerateApiItems(this._apiModel, 0);
	}

	private _enumerateApiItems(apiItem: ApiItem, level: number): void {
		console.log("----------------------------------------------------");
		console.log(`${"  ".repeat(level)} (${apiItem.kind}) [${apiItem.displayName}]`);
		console.log("----------------------------------------------------");

		if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
			this._enumerateDocs(apiItem.tsdocComment, level + 1);
		}

		for (const member of apiItem.members) {
			this._enumerateApiItems(member, level + 1);
		}
	}

	private _enumerateDocs(docNode: DocNode, level: number): void {
		if (!(docNode instanceof DocExcerpt)) {
			console.log(`${"  ".repeat(level)} (${docNode.kind})`);
		}

		for (const node of docNode.getChildNodes()) {
			this._enumerateDocs(node, level + 1);
		}
	}
}
export { DocumenterDebug };

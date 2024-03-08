import { ApiDocumentedItem, ApiEntryPoint, ApiItem, ApiModel } from "@microsoft/api-extractor-model";
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
			console.log(apiItem.tsdocComment.emitAsTsdoc());
			this._enumerateDocs(apiItem.tsdocComment, 0);
		}

		switch (apiItem.kind) {
			case "EntryPoint":
				const entryPoint = apiItem as ApiEntryPoint;
				console.log("EntryPoint");
				break;
			case "Package":
				console.log("Package");
				break;
			case "Namespace":
				console.log("Namespace");
				break;
			case "Enum":
				console.log("Enum");
				break;
			case "EnumMember":
				console.log("EnumMember");
				break;
			case "Class":
				console.log("Class");
				break;
			case "Interface":
				console.log("Interface");
				break;
			case "TypeAlias":
				console.log("TypeAlias");
				break;
			case "Function":
				console.log("Function");
				break;
			case "Variable":
				console.log("Variable");
				break;
			case "Property":
				console.log("Property");
				break;
			case "Method":
				console.log("Method");
				break;
			case "Constructor":
				console.log("Constructor");
				break;
			case "IndexSignature":
				console.log("IndexSignature");
				break;
			case "CallSignature":
				console.log("CallSignature");
				break;
			case "ConstructSignature":
				console.log("ConstructSignature");
				break;
		}

		for (const member of apiItem.members) {
			this._enumerateApiItems(member, level);
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

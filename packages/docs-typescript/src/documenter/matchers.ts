import {
	ApiClass,
	ApiConstructor,
	ApiDocumentedItem,
	ApiItem,
	ApiMethod,
	ApiNamespace,
	ApiPackage,
	ApiProperty
} from "@microsoft/api-extractor-model";
import { DocBlockTag, DocNode, DocNodeKind } from "@microsoft/tsdoc";

function isJSX(apiItem: ApiItem): boolean {
	if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment) return false;

	return enumerateDocForTag(apiItem.tsdocComment, "@jsx");
}

function isReactHook(apiItem: ApiItem): boolean {
	if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment) return false;

	return enumerateDocForTag(apiItem.tsdocComment, "@hook");
}

function isProps(apiItem: ApiItem): boolean {
	if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment) return false;

	return enumerateDocForTag(apiItem.tsdocComment, "@props");
}

function enumerateDocForTag(docNode: DocNode, tagName: string): boolean {
	if (docNode instanceof DocBlockTag && docNode.tagName === tagName) {
		return true;
	}

	for (const node of docNode.getChildNodes()) {
		if (enumerateDocForTag(node, tagName)) {
			return true;
		}
	}

	return false;
}

function isPackage(apiItem: ApiItem): apiItem is ApiPackage {
	return apiItem instanceof ApiPackage;
}

function isNamespace(apiItem: ApiItem): apiItem is ApiNamespace {
	return apiItem instanceof ApiNamespace;
}

function isClass(apiItem: ApiItem): apiItem is ApiClass {
	return apiItem instanceof ApiClass;
}

function isConstructor(apiItem: ApiItem): apiItem is ApiConstructor {
	return apiItem instanceof ApiConstructor;
}

function isProperty(apiItem: ApiItem): apiItem is ApiProperty {
	return apiItem instanceof ApiProperty;
}

function isMethod(apiItem: ApiItem): apiItem is ApiMethod {
	return apiItem instanceof ApiMethod;
}

export { isJSX, isReactHook, isProps, isPackage, isNamespace, isClass, isConstructor, isProperty, isMethod };

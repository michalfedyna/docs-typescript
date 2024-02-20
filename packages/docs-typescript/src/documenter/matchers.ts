import { ApiDocumentedItem, ApiItem } from "@microsoft/api-extractor-model";
import { DocBlockTag, DocNode, DocNodeKind } from "@microsoft/tsdoc";

function isJSX(apiItem: ApiItem): boolean {
  if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment)
    return false;

  return enumerateDocForTag(apiItem.tsdocComment, "@jsx");
}

function isReactHook(apiItem: ApiItem): boolean {
  if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment)
    return false;

  return enumerateDocForTag(apiItem.tsdocComment, "@hook");
}

function isProps(apiItem: ApiItem): boolean {
  if (!(apiItem instanceof ApiDocumentedItem) || !apiItem.tsdocComment)
    return false;

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

export { isJSX, isReactHook, isProps };

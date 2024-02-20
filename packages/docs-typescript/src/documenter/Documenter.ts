import {
  ApiClass,
  ApiConstructor,
  ApiDocumentedItem,
  ApiInterface,
  ApiItem,
  ApiModel,
  ApiNamespace,
  ApiProperty,
  ApiPropertySignature,
  ApiVariable,
  Excerpt,
} from "@microsoft/api-extractor-model";
import { DocBlockTag, DocNode, DocPlainText } from "@microsoft/tsdoc";
import { Hierarchy } from "./hierarchy/Hierarchy";
import { HierarchyItemType } from "./hierarchy/HierarchyItem";
import { isJSX, isProps, isReactHook } from "./matchers";

class Documenter {
  private _apiModel: ApiModel;
  private _hierarchy: Hierarchy;

  constructor(apiModel: ApiModel) {
    this._apiModel = apiModel;
    this._hierarchy = new Hierarchy();
  }

  public buildHierarchy(): void {
    this._enumerateApiItems(this._apiModel, "");
    this._hierarchy.debugPrint();
  }

  // Enumerate all top level items in the API model
  private _enumerateApiItems(apiItem: ApiItem, url: string): void {
    if (apiItem instanceof ApiNamespace) {
      this._hierarchy.addNamespace(
        apiItem.displayName,
        `${url}/${apiItem.displayName}`,
      );
      this._enumerateNamespace(apiItem, `${url}/${apiItem.displayName}`);
      return;
    }

    if (isJSX(apiItem)) {
      console.log("JSX", apiItem.displayName);
      return;
    }

    if (isReactHook(apiItem)) {
      console.log("Hook", apiItem.displayName);
      return;
    }

    if (isProps(apiItem)) {
      console.log("Props", apiItem.displayName);
      return;
    }

    if (apiItem instanceof ApiClass) {
      this._hierarchy.addChild(
        HierarchyItemType.ClassItem,
        apiItem.displayName,
        `${url}/${apiItem.displayName}`,
      );
      this._enumerateApiClass(apiItem);
      return;
    }

    if (apiItem instanceof ApiInterface) {
      this._hierarchy.addChild(
        HierarchyItemType.InterfaceItem,
        apiItem.displayName,
        `${url}/${apiItem.displayName}`,
      );
      this._enumerateApiInterface(apiItem);
      return;
    }

    if (apiItem instanceof ApiVariable) {
      this._hierarchy.addChild(
        HierarchyItemType.VariableItem,
        apiItem.displayName,
        `${url}/${apiItem.displayName}`,
      );
      this._enumerateVariable(apiItem);
      return;
    }

    if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
      this._enumerateDocNodes(apiItem.tsdocComment);
    }

    for (const member of apiItem.members) {
      this._enumerateApiItems(member, url);
    }
  }

  private _enumerateNamespace(apiNamespace: ApiNamespace, url: string): void {
    for (const member of apiNamespace.members) {
      this._enumerateApiItems(member, url);
    }
  }

  private _enumerateApiClass(apiClass: ApiClass): void {
    for (const member of apiClass.members) {
      if (member instanceof ApiConstructor) {
        this._enumerateApiConstructor(member);
      }

      if (member instanceof ApiProperty) {
        this._enumerateApiProperty(member);
      }
    }
  }

  private _enumerateApiConstructor(apiConstructor: ApiConstructor): void {
    for (const parameter of apiConstructor.parameters) {
    }
  }

  private _enumerateApiProperty(apiProperty: ApiProperty): void {}

  private _enumerateApiInterface(apiInterface: ApiInterface): void {}

  private _enumerateApiPropertySignature(
    apiPropertySignature: ApiPropertySignature,
  ): void {}

  private _enumerateVariable(apiVariable: ApiVariable): void {}

  private _enumerateDocNodes(docNode: DocNode): void {
    for (const childNode of docNode.getChildNodes()) {
      this._enumerateDocNodes(childNode);
    }
  }
}

export { Documenter };

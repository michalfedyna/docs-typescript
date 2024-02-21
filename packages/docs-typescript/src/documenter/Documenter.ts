import {
	ApiClass,
	ApiConstructor,
	ApiDocumentedItem,
	ApiInterface,
	ApiItem,
	ApiMethod,
	ApiModel,
	ApiNamespace,
	ApiPackage,
	ApiProperty,
	ApiPropertySignature,
	ApiVariable
} from "@microsoft/api-extractor-model";
import { DocNode } from "@microsoft/tsdoc";
import { Hierarchy } from "../hierarchy/Hierarchy";
import { HierarchyItem } from "../hierarchy/HierarchyItem";
import { isJSX, isProps, isReactHook } from "./matchers";
import { NamespaceItem } from "../hierarchy/items/NamespaceItem";
import { JSXItem } from "../hierarchy/items/JSXItem";
import { HookItem } from "../hierarchy/items/HookItem";
import { PackageItem } from "../hierarchy/items/PackageItem";
import { ClassItem } from "../hierarchy/items/ClassItem";
import { ConstructorItem } from "../hierarchy/items/ConstructorItem";
import { PropertyItem } from "../hierarchy/items/PropertyItem";
import { MethodItem } from "../hierarchy/items/MethodItem";
import { PropsItem } from "../hierarchy/items/PropsItem";

class Documenter {
	private _apiModel: ApiModel;
	private _hierarchy: Hierarchy;

	constructor(apiModel: ApiModel) {
		this._apiModel = apiModel;
		this._hierarchy = new Hierarchy("");
	}

	public buildHierarchy(): void {
		this._enumerateApiItems(this._apiModel, this._hierarchy);
		console.log(JSON.stringify(this._hierarchy.toObject(), null, " "));
	}

	public emit(): void {}

	private _enumerateApiItems(apiItem: ApiItem, parent?: HierarchyItem): void {
		let child: HierarchyItem | undefined;

		if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
			this._enumerateDocNodes(apiItem.tsdocComment);
		}

		if (apiItem instanceof ApiPackage) {
			child = this._hierarchy.addPackage(apiItem.displayName, parent);
			this._enumeratePackage(apiItem, child);
		} else if (apiItem instanceof ApiNamespace) {
			child = this._hierarchy.addNamespace(apiItem.displayName, parent);
			this._enumerateNamespace(apiItem, child);
		} else if (isJSX(apiItem)) {
			child = this._hierarchy.addJSX(apiItem.displayName, parent);
			this._enumerateJSX(apiItem, child);
		} else if (isReactHook(apiItem)) {
			child = this._hierarchy.addHook(apiItem.displayName, parent);
			this._enumerateHook(apiItem, child);
		} else if (isProps(apiItem)) {
			child = this._hierarchy.addProps(apiItem.displayName, parent);
			this._enumerateProps(apiItem, child);
		} else if (apiItem instanceof ApiClass) {
			child = this._hierarchy.addClass(apiItem.displayName, parent);
			this._enumerateApiClass(apiItem, child);
		} else if (apiItem instanceof ApiConstructor) {
			child = this._hierarchy.addConstructor(apiItem.displayName, parent);
			this._enumerateApiConstructor(apiItem, child);
		} else if (apiItem instanceof ApiProperty) {
			child = this._hierarchy.addProperty(apiItem.displayName, parent);
			this._enumerateApiProperty(apiItem, child);
		} else if (apiItem instanceof ApiMethod) {
			child = this._hierarchy.addMethod(apiItem.displayName, parent);
			this._enumerateApiMethod(apiItem, child);
		}

		for (const member of apiItem.members) {
			this._enumerateApiItems(member, child);
		}
	}

	private _enumeratePackage(apiPackage: ApiPackage, packageItem: PackageItem): void {}

	private _enumerateNamespace(apiNamespace: ApiNamespace, namespaceItem: NamespaceItem): void {}

	private _enumerateJSX(apiItem: ApiItem, jsxItem: JSXItem): void {}

	private _enumerateHook(apiItem: ApiItem, hookItem: HookItem): void {}

	private _enumerateProps(apiItem: ApiItem, propsItem: PropsItem): void {}

	private _enumerateApiClass(apiClass: ApiClass, classItem: ClassItem): void {}

	private _enumerateApiConstructor(apiConstructor: ApiConstructor, constructorItem: ConstructorItem): void {}

	private _enumerateApiProperty(apiProperty: ApiProperty, propertyItem: PropertyItem): void {}

	private _enumerateApiMethod(apiMethod: ApiMethod, methodItem: MethodItem): void {}

	private _enumerateApiInterface(apiInterface: ApiInterface): void {}

	private _enumerateApiPropertySignature(apiPropertySignature: ApiPropertySignature): void {}

	private _enumerateVariable(apiVariable: ApiVariable): void {}

	private _enumerateDocNodes(docNode: DocNode): void {
		for (const childNode of docNode.getChildNodes()) {
			this._enumerateDocNodes(childNode);
		}
	}
}

export { Documenter };

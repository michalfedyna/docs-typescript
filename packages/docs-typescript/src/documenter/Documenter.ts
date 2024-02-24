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
import { DocsItem } from "../hierarchy/DocsItem";

class Documenter {
	private _apiModel: ApiModel;
	private _hierarchy: Hierarchy;

	constructor(apiModel: ApiModel) {
		this._apiModel = apiModel;
		this._hierarchy = new Hierarchy("");
	}

	public buildHierarchy(): void {
		this._enumerateApiItems(this._apiModel, this._hierarchy);
		// console.log(JSON.stringify(this._hierarchy.toObject(), null, " "));
	}

	public emit(): void {}

	private _enumerateApiItems(apiItem: ApiItem, parent?: HierarchyItem): void {
		let child: HierarchyItem | undefined;
		let docs;

		if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
			this._enumerateDocNodes(apiItem.tsdocComment);
		}

		if (apiItem instanceof ApiPackage) {
			const packageItem = this._hierarchy.addPackage(apiItem.displayName, parent);
			this._enumeratePackage(apiItem, packageItem);
			child = packageItem;
		} else if (apiItem instanceof ApiNamespace) {
			const namespaceItem = this._hierarchy.addNamespace(apiItem.displayName, parent);
			this._enumerateNamespace(apiItem, namespaceItem);
			child = namespaceItem;
		} else if (isJSX(apiItem)) {
			const jsxItem = this._hierarchy.addJSX(apiItem.displayName, parent);
			this._enumerateJSX(apiItem, jsxItem);
			child = jsxItem;
		} else if (isReactHook(apiItem)) {
			const hookItem = this._hierarchy.addHook(apiItem.displayName, parent);
			this._enumerateHook(apiItem, hookItem);
			child = hookItem;
		} else if (isProps(apiItem)) {
			const propsItem = this._hierarchy.addProps(apiItem.displayName, parent);
			this._enumerateProps(apiItem, propsItem);
			child = propsItem;
		} else if (apiItem instanceof ApiClass) {
			const classItem = this._hierarchy.addClass(apiItem.displayName, parent);
			this._enumerateApiClass(apiItem, classItem);
			child = classItem;
		} else if (apiItem instanceof ApiConstructor) {
			const constructorItem = this._hierarchy.addConstructor(apiItem.displayName, parent);
			this._enumerateApiConstructor(apiItem, constructorItem);
			child = constructorItem;
		} else if (apiItem instanceof ApiProperty) {
			const propertyItem = this._hierarchy.addProperty(apiItem.displayName, parent);
			this._enumerateApiProperty(apiItem, propertyItem);
			child = propertyItem;
		} else if (apiItem instanceof ApiMethod) {
			const methodItem = this._hierarchy.addMethod(apiItem.displayName, parent);
			this._enumerateApiMethod(apiItem, methodItem);
			child = methodItem;
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

	private _enumerateApiClass(apiClass: ApiClass, classItem: ClassItem): void {
		const { isAbstract, fileUrlPath } = apiClass;
		const extendsType = apiClass.extendsType?.excerpt.text;
		const implementsTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);
	}

	private _enumerateApiConstructor(apiConstructor: ApiConstructor, constructorItem: ConstructorItem): void {
		const excerpt = apiConstructor.excerpt.text;
		const parameters = apiConstructor.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const overloadIndex = apiConstructor.overloadIndex;
		const isProtected = apiConstructor.isProtected;
		const fileUrlPath = apiConstructor.fileUrlPath;
	}

	private _enumerateApiProperty(apiProperty: ApiProperty, propertyItem: PropertyItem): void {
		const excerpt = apiProperty.excerpt.text;
		const isStatic = apiProperty.isStatic;
		const isAbstract = apiProperty.isAbstract;
		const isProtected = apiProperty.isProtected;
		const isReadonly = apiProperty.isReadonly;
		const isOptional = apiProperty.isOptional;
		const isEventProperty = apiProperty.isEventProperty;
		const fileUrlPath = apiProperty.fileUrlPath;
	}

	private _enumerateApiMethod(apiMethod: ApiMethod, methodItem: MethodItem): void {
		const excerpt = apiMethod.excerpt.text;
		const parameters = apiMethod.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));

		const isStatic = apiMethod.isStatic;
		const isAbstract = apiMethod.isAbstract;
		const isProtected = apiMethod.isProtected;
		const isOptional = apiMethod.isOptional;
		const overloadIndex = apiMethod.overloadIndex;
		const returnType = apiMethod.returnTypeExcerpt.text;
		const fileUrlPath = apiMethod.fileUrlPath;
	}

	private _enumerateApiInterface(apiInterface: ApiInterface): void {}

	private _enumerateApiPropertySignature(apiPropertySignature: ApiPropertySignature): void {}

	private _enumerateVariable(apiVariable: ApiVariable): void {}

	private _enumerateDocNodes(docNode: DocNode) {
		for (const childNode of docNode.getChildNodes()) {
			this._enumerateDocNodes(childNode);
		}
	}
}

export { Documenter };

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
import { DocFencedCode, DocNode, DocSection } from "@microsoft/tsdoc";
import { Hierarchy } from "../hierarchy/Hierarchy";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";
import {
	isClass,
	isConstructor,
	isJSX,
	isMethod,
	isNamespace,
	isPackage,
	isProperty,
	isProps,
	isReactHook
} from "./matchers";
import { NamespaceAttributes, NamespaceItem } from "../hierarchy/items/NamespaceItem";
import { JSXItem } from "../hierarchy/items/JSXItem";
import { HookItem } from "../hierarchy/items/HookItem";
import { PackageAttributes, PackageItem } from "../hierarchy/items/PackageItem";
import { ClassAttributes, ClassItem } from "../hierarchy/items/ClassItem";
import { ConstructorAttributes, ConstructorItem } from "../hierarchy/items/ConstructorItem";
import { PropertyAttributes, PropertyItem } from "../hierarchy/items/PropertyItem";
import { MethodAttributes, MethodItem } from "../hierarchy/items/MethodItem";
import { PropsItem } from "../hierarchy/items/PropsItem";
import { DocsBuilder } from "../hierarchy/docs/DocsBuilder";

class Documenter {
	private readonly _apiModel: ApiModel;
	private readonly _hierarchy: Hierarchy;

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
		let docsBuilder = new DocsBuilder();

		if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
			console.log("--------------------");
			console.log(apiItem.displayName);
			console.log("--------------------");
			this._enumerateDocNodes(apiItem.tsdocComment);
		}

		if (isPackage(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumeratePackage(apiItem);
			const packageItem = new PackageItem(attributes, docs, parent);
			child = this._hierarchy.addItem(packageItem, parent);
		} else if (isNamespace(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumerateNamespace(apiItem);
			const namespaceItem = new NamespaceItem(attributes, docs, parent);
			child = this._hierarchy.addItem(namespaceItem, parent);
		} else if (isJSX(apiItem)) {
			const jsxItem = new JSXItem(apiItem.displayName, parent);
			child = this._hierarchy.addItem(jsxItem, parent);
		} else if (isReactHook(apiItem)) {
			const hookItem = new HookItem(apiItem.displayName, parent);
			child = this._hierarchy.addItem(hookItem, parent);
		} else if (isProps(apiItem)) {
			const propsItem = new PropsItem(apiItem.displayName, parent);
			child = this._hierarchy.addItem(propsItem, parent);
		} else if (isClass(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumerateApiClass(apiItem);
			const classItem = new ClassItem(attributes, docs, parent);
			child = this._hierarchy.addItem(classItem, parent);
		} else if (isConstructor(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumerateApiConstructor(apiItem);
			const constructorItem = new ConstructorItem(attributes, docs, parent);
			child = this._hierarchy.addItem(constructorItem);
		} else if (isProperty(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumerateApiProperty(apiItem);
			const propertyItem = new PropertyItem(attributes, docs, parent);
			child = this._hierarchy.addItem(propertyItem, parent);
		} else if (isMethod(apiItem)) {
			const docs = docsBuilder.build();
			const attributes = this._enumerateApiMethod(apiItem);
			const methodItem = new MethodItem(attributes, docs, parent);
			child = this._hierarchy.addItem(methodItem, parent);
		}

		for (const member of apiItem.members) {
			this._enumerateApiItems(member, child);
		}
	}

	private _enumeratePackage(apiPackage: ApiPackage): PackageAttributes {
		const { displayName } = apiPackage;
		return { displayName };
	}

	private _enumerateNamespace(apiNamespace: ApiNamespace): NamespaceAttributes {
		const { displayName, fileUrlPath } = apiNamespace;
		return { displayName, fileUrlPath };
	}

	private _enumerateJSX(apiItem: ApiItem, jsxItem: JSXItem): void {}

	private _enumerateHook(apiItem: ApiItem, hookItem: HookItem): void {}

	private _enumerateProps(apiItem: ApiItem, propsItem: PropsItem): void {}

	private _enumerateApiClass(apiClass: ApiClass): ClassAttributes {
		const { displayName, isAbstract, fileUrlPath } = apiClass;
		const extendsType = apiClass.extendsType?.excerpt.text;
		const implementsTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);

		return {
			displayName,
			isAbstract,
			fileUrlPath,
			extendsType,
			implementedTypes: implementsTypes
		};
	}

	private _enumerateApiConstructor(apiConstructor: ApiConstructor): ConstructorAttributes {
		const { displayName, overloadIndex, isProtected, fileUrlPath } = apiConstructor;
		const parameters = apiConstructor.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));

		return {
			displayName,
			overloadIndex,
			isProtected,
			fileUrlPath,
			parameters
		};
	}

	private _enumerateApiProperty(apiProperty: ApiProperty): PropertyAttributes {
		const { displayName, isStatic, isAbstract, isProtected, isReadonly, isOptional, isEventProperty, fileUrlPath } =
			apiProperty;

		const type = apiProperty.propertyTypeExcerpt.text;

		return {
			displayName,
			fileUrlPath,
			isAbstract,
			isEventProperty,
			isOptional,
			isProtected,
			isReadonly,
			isStatic,
			type
		};
	}

	private _enumerateApiMethod(apiMethod: ApiMethod): MethodAttributes {
		const parameters = apiMethod.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiMethod.returnTypeExcerpt.text;
		const { displayName, isStatic, isAbstract, isProtected, isOptional, overloadIndex, fileUrlPath } = apiMethod;

		return {
			displayName,
			fileUrlPath,
			isAbstract,
			isOptional,
			isProtected,
			isStatic,
			overloadIndex,
			parameters,
			returnType
		};
	}

	private _enumerateApiInterface(apiInterface: ApiInterface): void {}

	private _enumerateApiPropertySignature(apiPropertySignature: ApiPropertySignature): void {}

	private _enumerateVariable(apiVariable: ApiVariable): void {}

	private _enumerateDocNodes(docNode: DocNode, level: number = 0) {
		console.log(" ".repeat(level * 2) + docNode.kind);

		if (docNode instanceof DocSection) {
		}

		if (docNode instanceof DocFencedCode) {
		}

		for (const childNode of docNode.getChildNodes()) {
			this._enumerateDocNodes(childNode, level + 1);
		}
	}
}

export { Documenter };

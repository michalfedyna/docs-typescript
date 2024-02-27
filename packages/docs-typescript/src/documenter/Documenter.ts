import {
	ApiClass,
	ApiConstructor,
	ApiConstructSignature,
	ApiDocumentedItem,
	ApiEnum,
	ApiEnumMember,
	ApiFunction,
	ApiIndexSignature,
	ApiInterface,
	ApiItem,
	ApiMethod,
	ApiMethodSignature,
	ApiModel,
	ApiNamespace,
	ApiPackage,
	ApiProperty,
	ApiPropertySignature,
	ApiTypeAlias,
	ApiVariable
} from "@microsoft/api-extractor-model";
import { DocFencedCode, DocNode, DocSection } from "@microsoft/tsdoc";
import { Hierarchy } from "../hierarchy/Hierarchy";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";
import {
	isClass,
	isConstructor,
	isConstructorSignature,
	isEntryPoint,
	isEnum,
	isEnumMember,
	isFunction,
	isIndexSignature,
	isInterface,
	isJSX,
	isMethod,
	isMethodSignature,
	isNamespace,
	isPackage,
	isProperty,
	isPropertySignature,
	isProps,
	isReactHook,
	isTypeAlias,
	isVariable
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
import { VariableAttributes, VariableItem } from "../hierarchy/items/VariableItem";
import { InterfaceAttributes, InterfaceItem } from "../hierarchy/items/InterfaceItem";
import { TypeAliasAttributes, TypeAliasItem } from "../hierarchy/items/TypeAliasItem";
import { ConstructorSignatureAttributes, ConstructorSignatureItem } from "../hierarchy/items/ConstructorSignatureItem";
import { PropertySignatureAttributes, PropertySignatureItem } from "../hierarchy/items/PropertySignatureItem";
import { MethodSignatureAttributes, MethodSignatureItem } from "../hierarchy/items/MethodSignatureItem";
import { IndexSignatureAttributes, IndexSignatureItem } from "../hierarchy/items/IndexSignatureItem";
import { FunctionAttributes, FunctionItem } from "../hierarchy/items/FunctionItem";
import { EnumAttributes, EnumItem } from "../hierarchy/items/EnumItem";
import { EnumMemberAttributes, EnumMemberItem } from "../hierarchy/items/EnumMemberItem";
import { DocsAttributes, DocsItem } from "../hierarchy/docs/DocsItem";

class Documenter {
	private readonly _apiModel: ApiModel;
	private readonly _hierarchy: Hierarchy;

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
		let docsAttributes: DocsAttributes = {};

		if (apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment) {
			const {
				summarySection,
				remarksBlock,
				returnsBlock,
				deprecatedBlock,
				typeParams,
				seeBlocks,
				params,
				customBlocks
			} = apiItem.tsdocComment;

			const defaultValueBlock = customBlocks.filter((block) => block.blockTag.tagName === "@defaultValue");
			const examplesBlock = customBlocks.filter((block) => block.blockTag.tagName === "@example");

			this._enumerateDocNodes(apiItem.tsdocComment);
		}

		if (isEntryPoint(apiItem)) {
			child = parent;
		} else if (isPackage(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumeratePackage(apiItem);
			const packageItem = new PackageItem(attributes, docs, parent);
			child = this._hierarchy.addItem(packageItem, parent);
		} else if (isNamespace(apiItem)) {
			const docs = new DocsItem(docsAttributes);
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
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateClass(apiItem);
			const classItem = new ClassItem(attributes, docs, parent);
			child = this._hierarchy.addItem(classItem, parent);
		} else if (isConstructor(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateConstructor(apiItem);
			const constructorItem = new ConstructorItem(attributes, docs, parent);
			child = this._hierarchy.addItem(constructorItem, parent);
		} else if (isProperty(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateProperty(apiItem);
			const propertyItem = new PropertyItem(attributes, docs, parent);
			child = this._hierarchy.addItem(propertyItem, parent);
		} else if (isMethod(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateMethod(apiItem);
			const methodItem = new MethodItem(attributes, docs, parent);
			child = this._hierarchy.addItem(methodItem, parent);
		} else if (isFunction(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateFunction(apiItem);
			const functionItem = new FunctionItem(attributes, docs, parent);
			child = this._hierarchy.addItem(functionItem, parent);
		} else if (isVariable(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateVariable(apiItem);
			const variableItem = new VariableItem(attributes, docs, parent);
			child = this._hierarchy.addItem(variableItem, parent);
		} else if (isInterface(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateInterface(apiItem);
			const interfaceItem = new InterfaceItem(attributes, docs, parent);
			child = this._hierarchy.addItem(interfaceItem, parent);
		} else if (isConstructorSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateConstructorSignature(apiItem);
			const constructorSignatureItem = new ConstructorSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(constructorSignatureItem, parent);
		} else if (isPropertySignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumeratePropertySignature(apiItem);
			const propertySignatureItem = new PropertySignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(propertySignatureItem, parent);
		} else if (isMethodSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateMethodSignature(apiItem);
			const methodSignatureItem = new MethodSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(methodSignatureItem, parent);
		} else if (isIndexSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateIndexSignature(apiItem);
			const indexSignatureItem = new IndexSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(indexSignatureItem, parent);
		} else if (isTypeAlias(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateTypeAlias(apiItem);
			const typeAliasItem = new TypeAliasItem(attributes, docs, parent);
			child = this._hierarchy.addItem(typeAliasItem, parent);
		} else if (isEnum(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateEnum(apiItem);
			const enumItem = new EnumItem(attributes, docs, parent);
			child = this._hierarchy.addItem(enumItem, parent);
		} else if (isEnumMember(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = this._enumerateEnumMember(apiItem);
			const enumMemberItem = new EnumMemberItem(attributes, docs, parent);
			child = this._hierarchy.addItem(enumMemberItem, parent);
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

	private _enumerateClass(apiClass: ApiClass): ClassAttributes {
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

	private _enumerateConstructor(apiConstructor: ApiConstructor): ConstructorAttributes {
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

	private _enumerateProperty(apiProperty: ApiProperty): PropertyAttributes {
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

	private _enumerateMethod(apiMethod: ApiMethod): MethodAttributes {
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

	private _enumerateInterface(apiInterface: ApiInterface): InterfaceAttributes {
		const { displayName, fileUrlPath } = apiInterface;
		const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);

		return { displayName, fileUrlPath, extendsTypes, typeParameters };
	}

	private _enumerateConstructorSignature(
		apiConstructorSignature: ApiConstructSignature
	): ConstructorSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex } = apiConstructorSignature;
		const returnType = apiConstructorSignature.returnTypeExcerpt.text;
		const parameters = apiConstructorSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));

		return { displayName, fileUrlPath, returnType, parameters, overloadIndex };
	}

	private _enumeratePropertySignature(apiPropertySignature: ApiPropertySignature): PropertySignatureAttributes {
		const { displayName, fileUrlPath, isReadonly, isOptional, isEventProperty } = apiPropertySignature;
		const type = apiPropertySignature.propertyTypeExcerpt.text;

		return { displayName, fileUrlPath, type, isOptional, isReadonly, isEventProperty };
	}

	private _enumerateMethodSignature(apiMethodSignature: ApiMethodSignature): MethodSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex, isOptional } = apiMethodSignature;
		const returnType = apiMethodSignature.returnTypeExcerpt.text;
		const parameters = apiMethodSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const typeParameters = apiMethodSignature.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));

		return { displayName, fileUrlPath, returnType, parameters, typeParameters, overloadIndex, isOptional };
	}

	private _enumerateIndexSignature(apiIndexSignature: ApiIndexSignature): IndexSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex, isReadonly } = apiIndexSignature;
		const parameters = apiIndexSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiIndexSignature.returnTypeExcerpt.text;

		return { displayName, fileUrlPath, parameters, returnType, overloadIndex, isReadonly };
	}

	private _enumerateTypeAlias(apiItem: ApiTypeAlias): TypeAliasAttributes {
		const { displayName, fileUrlPath } = apiItem;
		const type = apiItem.typeExcerpt.text;
		const typeParameters = apiItem.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));

		return { displayName, fileUrlPath, type, typeParameters };
	}

	private _enumerateVariable(apiVariable: ApiVariable): VariableAttributes {
		const { displayName, fileUrlPath } = apiVariable;
		const type = apiVariable.variableTypeExcerpt.text;

		return { displayName, fileUrlPath, type };
	}

	private _enumerateFunction(apiFunction: ApiFunction): FunctionAttributes {
		const { displayName, fileUrlPath, overloadIndex } = apiFunction;
		const parameters = apiFunction.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiFunction.returnTypeExcerpt.text;
		const typeParameters = apiFunction.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));

		return { displayName, fileUrlPath, parameters, typeParameters, returnType, overloadIndex };
	}

	private _enumerateEnum(apiEnum: ApiEnum): EnumAttributes {
		const { displayName, fileUrlPath } = apiEnum;
		const members = apiEnum.members.map((member) => ({
			name: member.name
		}));

		return { displayName, fileUrlPath, members };
	}

	private _enumerateEnumMember(apiEnum: ApiEnumMember): EnumMemberAttributes {
		const { displayName, fileUrlPath } = apiEnum;
		return { displayName, fileUrlPath };
	}

	private _enumerateDocNodes(docNode: DocNode, level: number = 0) {
		//console.log(" ".repeat(level * 2) + docNode.kind);

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

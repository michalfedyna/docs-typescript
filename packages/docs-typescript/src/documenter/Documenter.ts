import {
	ApiClass,
	ApiConstructor,
	ApiDocumentedItem,
	ApiItem,
	ApiItemKind,
	ApiMethod,
	ApiModel,
	ApiNamespace,
	ApiPackage,
	ApiProperty
} from "@microsoft/api-extractor-model";
import { DocNode } from "@microsoft/tsdoc";
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
} from "../utils/apiItemsMatchers";
import { NamespaceItem } from "../hierarchy/items/NamespaceItem";
import { JSXItem } from "../hierarchy/items/JSXItem";
import { HookItem } from "../hierarchy/items/HookItem";
import { PackageItem } from "../hierarchy/items/PackageItem";
import { ClassItem } from "../hierarchy/items/ClassItem";
import { ConstructorItem } from "../hierarchy/items/ConstructorItem";
import { PropertyItem } from "../hierarchy/items/PropertyItem";
import { MethodItem } from "../hierarchy/items/MethodItem";
import { PropsItem } from "../hierarchy/items/PropsItem";
import { VariableItem } from "../hierarchy/items/VariableItem";
import { InterfaceItem } from "../hierarchy/items/InterfaceItem";
import { TypeAliasItem } from "../hierarchy/items/TypeAliasItem";
import { ConstructorSignatureItem } from "../hierarchy/items/ConstructorSignatureItem";
import { PropertySignatureItem } from "../hierarchy/items/PropertySignatureItem";
import { MethodSignatureItem } from "../hierarchy/items/MethodSignatureItem";
import { IndexSignatureItem } from "../hierarchy/items/IndexSignatureItem";
import { FunctionItem } from "../hierarchy/items/FunctionItem";
import { EnumItem } from "../hierarchy/items/EnumItem";
import { EnumMemberItem } from "../hierarchy/items/EnumMemberItem";
import { DocsAttributes, DocsItem } from "../hierarchy/docs/DocsItem";
import { isCodeSpan, isFencedCode, isLinkTag, isParagraph, isPlainText, isSoftBreak } from "../utils/docsNodesMatchers";
import { LineWriter } from "../utils/LineWriter";
import { AttributesExtractors } from "./AttributesExtractors";
import { DocsConfig } from "../config/DocsConfig";
import { Emitter } from "../emitters/Emitter";
import { HTMLEmitter } from "../emitters/HTMLEmitter";
import { MDEmitter } from "../emitters/MDEmitter";
import { MDXEmitter } from "../emitters/MDXEmitter";

class Documenter {
	private readonly _apiModel: ApiModel;
	private readonly _hierarchy: Hierarchy;
	private readonly _config: DocsConfig;
	private readonly _emitter: Emitter;

	constructor(apiModel: ApiModel, config: DocsConfig) {
		this._apiModel = apiModel;
		this._config = config;
		this._hierarchy = new Hierarchy("");

		switch (config.format) {
			case "html":
				this._emitter = new HTMLEmitter();
				break;

			case "markdown":
				this._emitter = new MDEmitter();
				break;

			case "mdx":
				this._emitter = new MDXEmitter();
				break;
		}
	}

	public emit(): void {
		this._buildHierarchy();
		this._emitter.emit();
	}

	private _buildHierarchy(): void {
		this._enumerateApiItems(this._apiModel, this._hierarchy);
		// console.log(JSON.stringify(this._hierarchy.toObject(), null, " "));
	}

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

			const summary = this._enumerateDocNodes(summarySection);
			const remarks = remarksBlock ? this._enumerateDocNodes(remarksBlock.content) : "";
			const returns = returnsBlock ? this._enumerateDocNodes(returnsBlock.content) : "";
			const paramsArray = params.blocks.map((block) => {
				return { name: block.parameterName, docs: this._enumerateDocNodes(block.content) };
			});
			const examples = examplesBlock.map((block, index) => ({
				name: examplesBlock.length > 1 ? `Example ${index}` : "Example",
				docs: this._enumerateDocNodes(block.content)
			}));
		}

		if (isEntryPoint(apiItem)) {
			child = parent;
		} else if (isPackage(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiPackage(apiItem);
			const packageItem = new PackageItem(attributes, docs, parent);
			child = this._hierarchy.addItem(packageItem, parent);
		} else if (isNamespace(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiNamespace(apiItem);
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
			const attributes = AttributesExtractors.apiClass(apiItem);
			const classItem = new ClassItem(attributes, docs, parent);
			child = this._hierarchy.addItem(classItem, parent);
		} else if (isConstructor(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiConstructor(apiItem);
			const constructorItem = new ConstructorItem(attributes, docs, parent);
			child = this._hierarchy.addItem(constructorItem, parent);
		} else if (isProperty(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiProperty(apiItem);
			const propertyItem = new PropertyItem(attributes, docs, parent);
			child = this._hierarchy.addItem(propertyItem, parent);
		} else if (isMethod(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiMethod(apiItem);
			const methodItem = new MethodItem(attributes, docs, parent);
			child = this._hierarchy.addItem(methodItem, parent);
		} else if (isFunction(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiFunction(apiItem);
			const functionItem = new FunctionItem(attributes, docs, parent);
			child = this._hierarchy.addItem(functionItem, parent);
		} else if (isVariable(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiVariable(apiItem);
			const variableItem = new VariableItem(attributes, docs, parent);
			child = this._hierarchy.addItem(variableItem, parent);
		} else if (isInterface(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiInterface(apiItem);
			const interfaceItem = new InterfaceItem(attributes, docs, parent);
			child = this._hierarchy.addItem(interfaceItem, parent);
		} else if (isConstructorSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiConstructorSignature(apiItem);
			const constructorSignatureItem = new ConstructorSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(constructorSignatureItem, parent);
		} else if (isPropertySignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiPropertySignature(apiItem);
			const propertySignatureItem = new PropertySignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(propertySignatureItem, parent);
		} else if (isMethodSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiMethodSignature(apiItem);
			const methodSignatureItem = new MethodSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(methodSignatureItem, parent);
		} else if (isIndexSignature(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiIndexSignature(apiItem);
			const indexSignatureItem = new IndexSignatureItem(attributes, docs, parent);
			child = this._hierarchy.addItem(indexSignatureItem, parent);
		} else if (isTypeAlias(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiTypeAlias(apiItem);
			const typeAliasItem = new TypeAliasItem(attributes, docs, parent);
			child = this._hierarchy.addItem(typeAliasItem, parent);
		} else if (isEnum(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiEnum(apiItem);
			const enumItem = new EnumItem(attributes, docs, parent);
			child = this._hierarchy.addItem(enumItem, parent);
		} else if (isEnumMember(apiItem)) {
			const docs = new DocsItem(docsAttributes);
			const attributes = AttributesExtractors.apiEnumMember(apiItem);
			const enumMemberItem = new EnumMemberItem(attributes, docs, parent);
			child = this._hierarchy.addItem(enumMemberItem, parent);
		}

		for (const member of apiItem.members) {
			this._enumerateApiItems(member, child);
		}
	}

	private _enumerateDocNodes(docNode: DocNode): void {
		if (isPlainText(docNode)) {
		} else if (isParagraph(docNode)) {
		} else if (isSoftBreak(docNode)) {
		} else if (isLinkTag(docNode)) {
		} else if (isCodeSpan(docNode)) {
		} else if (isFencedCode(docNode)) {
		}

		for (const childNode of docNode.getChildNodes()) {
			this._enumerateDocNodes(childNode);
		}
	}
}

export { Documenter };

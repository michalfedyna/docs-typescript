import { ApiDocumentedItem, ApiItem, ApiModel } from "@microsoft/api-extractor-model";
import { DocNode as ApiDocNode } from "@microsoft/tsdoc";
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
import { DocsAttributes } from "./docs/DocsAttributes";
import { isCodeSpan, isFencedCode, isLinkTag, isParagraph, isPlainText, isSoftBreak } from "../utils/docsNodesMatchers";
import { Extractors } from "./api/Extractors";
import { DocsConfig } from "../config/DocsConfig";
import { Emitter } from "../emitters/Emitter";
import { HTMLEmitter } from "../emitters/HTMLEmitter";
import { MDEmitter } from "../emitters/MDEmitter";
import { MDXEmitter } from "../emitters/MDXEmitter";
import { RootNode } from "./api/RootNode";
import { ApiNode } from "./api/ApiNode";
import { PackageNode } from "./api/PackageNode";
import { NamespaceNode } from "./api/NamespaceNode";
import { ClassNode } from "./api/ClassNode";
import { ConstructorNode } from "./api/ConstructorNode";
import { PropertyNode } from "./api/PropertyNode";
import { MethodNode } from "./api/MethodNode";
import { FunctionNode } from "./api/FunctionNode";
import { VariableNode } from "./api/VariableNode";
import { InterfaceNode } from "./api/InterfaceNode";
import { ConstructorSignatureNode } from "./api/ConstructorSignatureNode";
import { PropertySignatureNode } from "./api/PropertySignatureNode";
import { MethodSignatureNode } from "./api/MethodSignatureNode";
import { IndexSignatureNode } from "./api/IndexSignatureNode";
import { TypeAliasNode } from "./api/TypeAliasNode";
import { EnumNode } from "./api/EnumNode";
import { EnumMemberNode } from "./api/EnumMemberNode";
import { DocNode } from "./docs/DocNode";
import { RootDocNode } from "./docs/RootDocNode";
import { PlainTextDocNode } from "./docs/PlainTextDocNode";
import { ParagraphDocNode } from "./docs/ParagraphDocNode";

class Documenter {
	public readonly apiModel: ApiModel;
	public readonly apiTree: RootNode;
	public readonly config: DocsConfig;
	public readonly emitter: Emitter;

	constructor(apiModel: ApiModel, config: DocsConfig) {
		this.apiModel = apiModel;
		this.config = config;
		this.apiTree = new RootNode();

		switch (config.outputFormat) {
			// case "html":
			// 	this._emitter = new HTMLEmitter(config);
			// 	break;
			//
			// case "markdown":
			// 	this._emitter = new MDEmitter(config);
			// 	break;
			//
			// case "mdx":
			// 	this._emitter = new MDXEmitter(config);
			// 	break;
			default:
				this.emitter = new MDEmitter(config);
		}
	}

	public emit(): void {
		this._buildHierarchy();
		console.log(JSON.stringify(this.apiTree.toObject(), null, 2));
		this.emitter.emit(this.apiTree);
	}

	private _buildHierarchy(): void {
		this._traverseApiItems(this.apiModel, this.apiTree);
	}

	private _traverseApiItems(apiItem: ApiItem, parent: ApiNode): void {
		let child: ApiNode | undefined;
		let docs: DocsAttributes = {};

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

			const defaultValueBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@defaultValue");
			const examplesBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@example");
			const sinceBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@since");
			const infoBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@info");
			const warningBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@warning");
			const errorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@error");
			const authorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@author");

			docs.summary = this._traverseDocNodes(summarySection);
			docs.remarks = this._traverseDocNodes(remarksBlock);
			docs.returns = this._traverseDocNodes(returnsBlock);
			docs.deprecated = this._traverseDocNodes(deprecatedBlock);

			if (typeParams.blocks.length > 0) {
				docs.typeParams = typeParams.blocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (params.blocks.length > 0) {
				docs.params = params.blocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (seeBlocks.length > 0) {
				docs.see = seeBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (examplesBlocks.length > 0) {
				docs.examples = examplesBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (defaultValueBlocks.length > 0) {
				docs.defaultValue = defaultValueBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (sinceBlocks.length > 0) {
				docs.since = sinceBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (infoBlocks.length > 0) {
				docs.infos = infoBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (warningBlocks.length > 0) {
				docs.warnings = warningBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (errorBlocks.length > 0) {
				docs.errors = errorBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}

			if (authorBlocks.length > 0) {
				docs.authors = authorBlocks
					.map((block) => this._traverseDocNodes(block))
					.filter((node): node is RootDocNode => node !== undefined);
			}
		}

		if (isPackage(apiItem)) {
			const attributes = Extractors.apiPackage(apiItem);
			const packageNode = new PackageNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(packageNode);
		} else if (isNamespace(apiItem)) {
			// TODO: Move extractor to node method
			const attributes = Extractors.apiNamespace(apiItem);
			const namespaceNode = new NamespaceNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(namespaceNode);
		} else if (isJSX(apiItem)) {
			// TODO: Implement
		} else if (isReactHook(apiItem)) {
			// TODO: Implement
		} else if (isProps(apiItem)) {
			// TODO: Implement
		} else if (isClass(apiItem)) {
			const attributes = Extractors.apiClass(apiItem);
			const classNode = new ClassNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(classNode);
		} else if (isConstructor(apiItem)) {
			const attributes = Extractors.apiConstructor(apiItem);
			const constructorNode = new ConstructorNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(constructorNode);
		} else if (isProperty(apiItem)) {
			const attributes = Extractors.apiProperty(apiItem);
			const propertyNode = new PropertyNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(propertyNode);
		} else if (isMethod(apiItem)) {
			const attributes = Extractors.apiMethod(apiItem);
			const methodNode = new MethodNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(methodNode);
		} else if (isFunction(apiItem)) {
			const attributes = Extractors.apiFunction(apiItem);
			const functionNode = new FunctionNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(functionNode);
		} else if (isVariable(apiItem)) {
			const attributes = Extractors.apiVariable(apiItem);

			const variableNode = new VariableNode({ attributes, docs, name: attributes.name });
			child = parent.addChild(variableNode);
		} else if (isInterface(apiItem)) {
			const attributes = Extractors.apiInterface(apiItem);
			const interfaceNode = new InterfaceNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(interfaceNode);
		} else if (isConstructorSignature(apiItem)) {
			const attributes = Extractors.apiConstructorSignature(apiItem);
			const constructorSignatureNode = new ConstructorSignatureNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(constructorSignatureNode);
		} else if (isPropertySignature(apiItem)) {
			const attributes = Extractors.apiPropertySignature(apiItem);
			const propertySignatureNode = new PropertySignatureNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(propertySignatureNode);
		} else if (isMethodSignature(apiItem)) {
			const attributes = Extractors.apiMethodSignature(apiItem);
			const methodSignatureNode = new MethodSignatureNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(methodSignatureNode);
		} else if (isIndexSignature(apiItem)) {
			const attributes = Extractors.apiIndexSignature(apiItem);
			const indexSignatureNode = new IndexSignatureNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(indexSignatureNode);
		} else if (isTypeAlias(apiItem)) {
			const attributes = Extractors.apiTypeAlias(apiItem);
			const typeAliasNode = new TypeAliasNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(typeAliasNode);
		} else if (isEnum(apiItem)) {
			const attributes = Extractors.apiEnum(apiItem);
			const enumNode = new EnumNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(enumNode);
		} else if (isEnumMember(apiItem)) {
			const attributes = Extractors.apiEnumMember(apiItem);
			const enumMemberNode = new EnumMemberNode({ attributes, docs, name: attributes.name });

			child = parent.addChild(enumMemberNode);
		}

		for (const member of apiItem.members) {
			this._traverseApiItems(member, child || parent);
		}
	}

	private _traverseDocNodes(apiDocNode?: ApiDocNode, parent?: DocNode): RootDocNode | undefined {
		if (!apiDocNode) return;

		if (!parent) parent = new RootDocNode();

		let child: DocNode | undefined;

		if (isPlainText(apiDocNode)) {
			const attributes = { text: apiDocNode.text };
			const plainTextNode = new PlainTextDocNode({ attributes: attributes });

			child = parent.addChild(plainTextNode);
		} else if (isParagraph(apiDocNode)) {
			const paragraphNode = new ParagraphDocNode({ attributes: {} });

			child = parent.addChild(paragraphNode);
		} else if (isSoftBreak(apiDocNode)) {
		} else if (isLinkTag(apiDocNode)) {
		} else if (isCodeSpan(apiDocNode)) {
		} else if (isFencedCode(apiDocNode)) {
		}

		for (const member of apiDocNode.getChildNodes()) {
			this._traverseDocNodes(member, child || parent);
		}

		return child || parent;
	}
}

export { Documenter };

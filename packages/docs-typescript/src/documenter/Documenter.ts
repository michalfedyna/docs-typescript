import { ApiDocumentedItem, ApiItem, ApiModel } from "@microsoft/api-extractor-model";
import { DocNode } from "@microsoft/tsdoc";
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
import { DocsAttributes } from "../hierarchy/docs/DocsItem";
import { isCodeSpan, isFencedCode, isLinkTag, isParagraph, isPlainText, isSoftBreak } from "../utils/docsNodesMatchers";
import { Extractors } from "./api/Extractors";
import { DocsConfig } from "../config/DocsConfig";
import { Emitter } from "../emitters/Emitter";
import { HTMLEmitter } from "../emitters/HTMLEmitter";
import { MDEmitter } from "../emitters/MDEmitter";
import { MDXEmitter } from "../emitters/MDXEmitter";
import { DocWriter } from "../hierarchy/docs/DocsWriter";
import { RootNode } from "./api/RootNode";
import { ApiNode } from "./tree/ApiNode";
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
		// console.log(JSON.stringify(this._hierarchy.toObject(), null, 2));
		this.emitter.emit(this.apiTree);
	}

	private _buildHierarchy(): void {
		this._traverseApiItems(this.apiModel, this.apiTree);
	}

	private _traverseApiItems(apiItem: ApiItem, parent?: ApiNode): void {
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

			// console.log("--------------");
			// console.log(apiItem.displayName, apiItem.kind);
			// console.log("--------------");

			const defaultValueBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@defaultValue");
			const examplesBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@example");
			const sinceBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@since");
			const infoBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@info");
			const warningBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@warning");
			const errorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@error");
			const authorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@author");

			docs.summary = { content: this._traverseDocNodes(summarySection, new DocWriter()) };

			docs.remarks = remarksBlock
				? { content: this._traverseDocNodes(remarksBlock.content, new DocWriter()) }
				: undefined;

			docs.returns = returnsBlock
				? { content: this._traverseDocNodes(returnsBlock.content, new DocWriter()) }
				: undefined;

			docs.deprecated = deprecatedBlock
				? { content: this._traverseDocNodes(deprecatedBlock.content, new DocWriter()) }
				: undefined;

			docs.typeParams = typeParams
				? typeParams.blocks.map((block) => ({
						name: block.parameterName,
						content: this._traverseDocNodes(block.content, new DocWriter())
					}))
				: undefined;

			docs.params = params
				? params.blocks.map((block) => ({
						name: block.parameterName,
						content: this._traverseDocNodes(block.content, new DocWriter())
					}))
				: undefined;

			docs.see = seeBlocks
				? seeBlocks.map((block) => ({
						content: this._traverseDocNodes(block.content, new DocWriter())
					}))
				: undefined;

			docs.examples = examplesBlocks.map((block, index) => ({
				name: examplesBlocks.length > 1 ? `Example ${index}` : "Example",
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));

			docs.defaultValue = defaultValueBlocks.length
				? { content: this._traverseDocNodes(defaultValueBlocks[0].content, new DocWriter()) }
				: undefined;

			docs.since = sinceBlocks.map((block) => ({
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));

			docs.infos = infoBlocks.map((block) => ({
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));

			docs.warnings = warningBlocks.map((block) => ({
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));

			docs.errors = errorBlocks.map((block) => ({
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));

			docs.authors = authorBlocks.map((block) => ({
				content: this._traverseDocNodes(block.content, new DocWriter())
			}));
		}

		if (isEntryPoint(apiItem)) {
			child = parent;
		} else if (isPackage(apiItem)) {
			const attributes = Extractors.apiPackage(apiItem);
			const packageNode = new PackageNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(packageNode, parent);
		} else if (isNamespace(apiItem)) {
			const attributes = Extractors.apiNamespace(apiItem);
			const namespaceNode = new NamespaceNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(namespaceNode, parent);
		} else if (isJSX(apiItem)) {
			// TODO: Implement
		} else if (isReactHook(apiItem)) {
			// TODO: Implement
		} else if (isProps(apiItem)) {
			// TODO: Implement
		} else if (isClass(apiItem)) {
			const attributes = Extractors.apiClass(apiItem);
			const classNode = new ClassNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(classNode, parent);
		} else if (isConstructor(apiItem)) {
			const attributes = Extractors.apiConstructor(apiItem);
			const constructorNode = new ConstructorNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(constructorNode, parent);
		} else if (isProperty(apiItem)) {
			const attributes = Extractors.apiProperty(apiItem);
			const propertyNode = new PropertyNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(propertyNode, parent);
		} else if (isMethod(apiItem)) {
			const attributes = Extractors.apiMethod(apiItem);
			const methodNode = new MethodNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(methodNode, parent);
		} else if (isFunction(apiItem)) {
			const attributes = Extractors.apiFunction(apiItem);
			const functionNode = new FunctionNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(functionNode, parent);
		} else if (isVariable(apiItem)) {
			const attributes = Extractors.apiVariable(apiItem);

			const variableNode = new VariableNode({ attributes, docs, name: attributes.name }, parent);
			const child = this.apiTree.addChild(variableNode, parent);
		} else if (isInterface(apiItem)) {
			const attributes = Extractors.apiInterface(apiItem);
			const interfaceNode = new InterfaceNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(interfaceNode, parent);
		} else if (isConstructorSignature(apiItem)) {
			const attributes = Extractors.apiConstructorSignature(apiItem);
			const constructorSignatureNode = new ConstructorSignatureNode(
				{ attributes, docs, name: attributes.name },
				parent
			);

			child = this.apiTree.addChild(constructorSignatureNode, parent);
		} else if (isPropertySignature(apiItem)) {
			const attributes = Extractors.apiPropertySignature(apiItem);
			const propertySignatureNode = new PropertySignatureNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(propertySignatureNode, parent);
		} else if (isMethodSignature(apiItem)) {
			const attributes = Extractors.apiMethodSignature(apiItem);
			const methodSignatureNode = new MethodSignatureNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(methodSignatureNode, parent);
		} else if (isIndexSignature(apiItem)) {
			const attributes = Extractors.apiIndexSignature(apiItem);
			const indexSignatureNode = new IndexSignatureNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(indexSignatureNode, parent);
		} else if (isTypeAlias(apiItem)) {
			const attributes = Extractors.apiTypeAlias(apiItem);
			const typeAliasNode = new TypeAliasNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(typeAliasNode, parent);
		} else if (isEnum(apiItem)) {
			const attributes = Extractors.apiEnum(apiItem);
			const enumNode = new EnumNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(enumNode, parent);
		} else if (isEnumMember(apiItem)) {
			const attributes = Extractors.apiEnumMember(apiItem);
			const enumMemberNode = new EnumMemberNode({ attributes, docs, name: attributes.name }, parent);

			child = this.apiTree.addChild(enumMemberNode, parent);
		}

		for (const member of apiItem.members) {
			this._traverseApiItems(member, child);
		}
	}

	private _traverseDocNodes(docNode: DocNode, writer: DocWriter, level: number = 0): string {
		// console.log(" ".repeat(level * 2) + docNode.kind);

		if (isPlainText(docNode)) {
			writer.writeContent(docNode.text);
		} else if (isParagraph(docNode)) {
			writer = writer.writeParagraph() || writer;
		} else if (isSoftBreak(docNode)) {
		} else if (isLinkTag(docNode)) {
			writer.writeLink(docNode.linkText || docNode.urlDestination! || "");
		} else if (isCodeSpan(docNode)) {
			writer.writeInlineCode(docNode.code);
		} else if (isFencedCode(docNode)) {
			writer.writeCode(docNode.code, docNode.language);
		}

		for (const childNode of docNode.getChildNodes()) {
			this._traverseDocNodes(childNode, writer, level + 1);
		}

		return writer.toString();
	}
}

export { Documenter };

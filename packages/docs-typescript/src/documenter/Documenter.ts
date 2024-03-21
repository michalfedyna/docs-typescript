import { DocNode as ApiDocNode } from "@microsoft/tsdoc";
import { ApiDocumentedItem, ApiItem, ApiModel } from "@microsoft/api-extractor-model";
import {
	isClass,
	isConstructor,
	isConstructorSignature,
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
import { DocsConfig } from "../config/DocsConfig";
import { Emitter } from "../emitters/Emitter";
import { MDEmitter } from "../emitters/markdown/MDEmitter";
import { HTMLEmitter } from "../emitters/html/HTMLEmitter";
import { MDXEmitter } from "../emitters/mdx/MDXEmitter";
import { RootNode } from "./api/RootNode";
import { ApiNode } from "./api/ApiNode";
import { extractPackageAttributes, PackageNode } from "./api/PackageNode";
import { extractNamespaceAttributes, NamespaceNode } from "./api/NamespaceNode";
import { ClassNode, extractClassAttributes } from "./api/class/ClassNode";
import { ConstructorNode, extractConstructorAttributes } from "./api/class/ConstructorNode";
import { extractPropertyAttributes, PropertyNode } from "./api/class/PropertyNode";
import { extractMethodAttributes, MethodNode } from "./api/class/MethodNode";
import { extractFunctionAttributes, FunctionNode } from "./api/FunctionNode";
import { extractVariableAttributes, VariableNode } from "./api/VariableNode";
import { extractInterfaceAttributes, InterfaceNode } from "./api/interface/InterfaceNode";
import {
	ConstructorSignatureNode,
	extractConstructorSignatureAttributes
} from "./api/interface/ConstructorSignatureNode";
import { extractPropertySignatureAttributes, PropertySignatureNode } from "./api/interface/PropertySignatureNode";
import { extractMethodSignatureAttributes, MethodSignatureNode } from "./api/interface/MethodSignatureNode";
import { extractIndexSignatureAttributes, IndexSignatureNode } from "./api/interface/IndexSignatureNode";
import { extractTypeAliasAttributes, TypeAliasNode } from "./api/TypeAliasNode";
import { EnumNode, extractEnumAttributes } from "./api/enum/EnumNode";
import { EnumMemberNode, extractEnumMemberAttributes } from "./api/enum/EnumMemberNode";
import { DocNode } from "./docs/DocNode";
import { RootDocNode } from "./docs/RootDocNode";
import { PlainTextDocNode } from "./docs/PlainTextDocNode";
import { ParagraphDocNode } from "./docs/ParagraphDocNode";
import { SoftBreakDocNode } from "./docs/SoftBreakDocNode";
import { CodeSpanDocNode } from "./docs/CodeSpanDocNode";
import { FancedCodeDocNode } from "./docs/FancedCodeDocNode";
import { LinkTagDocNode } from "./docs/LinkTagNode";

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
		// console.log(JSON.stringify(this.apiTree.toObject(), null, 2));
		traverseApiItems(this.apiModel, this.apiTree);
		this.emitter.emit(this.apiTree);
	}
}

function traverseApiItems(apiItem: ApiItem, parent: ApiNode) {
	let docs: DocsAttributes = extractDocs(apiItem);
	let child: ApiNode | undefined = extractApi(apiItem, parent, docs);

	for (const member of apiItem.members) {
		traverseApiItems(member, child || parent);
	}
}

function traverseDocNodes(apiDocNode?: ApiDocNode, parent?: DocNode): RootDocNode | undefined {
	if (!apiDocNode) return;

	if (!parent) parent = new RootDocNode();

	let child: DocNode | undefined;

	if (isPlainText(apiDocNode)) {
		const attributes = { text: apiDocNode.text };
		const plainTextNode = new PlainTextDocNode(attributes);

		parent.addChild(plainTextNode);
	} else if (isParagraph(apiDocNode)) {
		const paragraphNode = new ParagraphDocNode({});

		child = parent.addChild(paragraphNode);
	} else if (isSoftBreak(apiDocNode)) {
		const softBreakNode = new SoftBreakDocNode({});

		parent.addChild(softBreakNode);
	} else if (isLinkTag(apiDocNode)) {
		const attributes = {};
		const linkTagNode = new LinkTagDocNode(attributes);

		parent.addChild(linkTagNode);
	} else if (isCodeSpan(apiDocNode)) {
		const attributes = { code: apiDocNode.code };
		const codeSpanDocNode = new CodeSpanDocNode(attributes);

		parent.addChild(codeSpanDocNode);
	} else if (isFencedCode(apiDocNode)) {
		const attributes = { code: apiDocNode.code, language: apiDocNode.language };
		const fancedCodeDocNode = new FancedCodeDocNode(attributes);

		parent.addChild(fancedCodeDocNode);
	}

	for (const member of apiDocNode.getChildNodes()) {
		traverseDocNodes(member, child || parent);
	}

	return child || parent;
}

function extractApi(apiItem: ApiItem, parent: ApiNode, docs: DocsAttributes): ApiNode | undefined {
	if (isPackage(apiItem)) {
		const attributes = extractPackageAttributes(apiItem);
		const packageNode = new PackageNode({ attributes, docs, name: attributes.name });

		return parent.addChild(packageNode);
	} else if (isNamespace(apiItem)) {
		const attributes = extractNamespaceAttributes(apiItem);
		const namespaceNode = new NamespaceNode({ attributes, docs, name: attributes.name });

		return parent.addChild(namespaceNode);
	} else if (isJSX(apiItem)) {
		// TODO: Implement
	} else if (isReactHook(apiItem)) {
		// TODO: Implement
	} else if (isProps(apiItem)) {
		// TODO: Implement
	} else if (isClass(apiItem)) {
		const attributes = extractClassAttributes(apiItem);
		const classNode = new ClassNode({ attributes, docs, name: attributes.name });

		return parent.addChild(classNode);
	} else if (isConstructor(apiItem)) {
		const attributes = extractConstructorAttributes(apiItem);
		const constructorNode = new ConstructorNode({ attributes, docs, name: attributes.name });

		return parent.addChild(constructorNode);
	} else if (isProperty(apiItem)) {
		const attributes = extractPropertyAttributes(apiItem);
		const propertyNode = new PropertyNode({ attributes, docs, name: attributes.name });

		return parent.addChild(propertyNode);
	} else if (isMethod(apiItem)) {
		const attributes = extractMethodAttributes(apiItem);
		const methodNode = new MethodNode({ attributes, docs, name: attributes.name });

		return parent.addChild(methodNode);
	} else if (isFunction(apiItem)) {
		const attributes = extractFunctionAttributes(apiItem);
		const functionNode = new FunctionNode({ attributes, docs, name: attributes.name });

		return parent.addChild(functionNode);
	} else if (isVariable(apiItem)) {
		const attributes = extractVariableAttributes(apiItem);
		const variableNode = new VariableNode({ attributes, docs, name: attributes.name });

		return parent.addChild(variableNode);
	} else if (isInterface(apiItem)) {
		const attributes = extractInterfaceAttributes(apiItem);
		const interfaceNode = new InterfaceNode({ attributes, docs, name: attributes.name });

		return parent.addChild(interfaceNode);
	} else if (isConstructorSignature(apiItem)) {
		const attributes = extractConstructorSignatureAttributes(apiItem);
		const constructorSignatureNode = new ConstructorSignatureNode({ attributes, docs, name: attributes.name });

		return parent.addChild(constructorSignatureNode);
	} else if (isPropertySignature(apiItem)) {
		const attributes = extractPropertySignatureAttributes(apiItem);
		const propertySignatureNode = new PropertySignatureNode({ attributes, docs, name: attributes.name });

		return parent.addChild(propertySignatureNode);
	} else if (isMethodSignature(apiItem)) {
		const attributes = extractMethodSignatureAttributes(apiItem);
		const methodSignatureNode = new MethodSignatureNode({ attributes, docs, name: attributes.name });

		return parent.addChild(methodSignatureNode);
	} else if (isIndexSignature(apiItem)) {
		const attributes = extractIndexSignatureAttributes(apiItem);
		const indexSignatureNode = new IndexSignatureNode({ attributes, docs, name: attributes.name });

		return parent.addChild(indexSignatureNode);
	} else if (isTypeAlias(apiItem)) {
		const attributes = extractTypeAliasAttributes(apiItem);
		const typeAliasNode = new TypeAliasNode({ attributes, docs, name: attributes.name });

		return parent.addChild(typeAliasNode);
	} else if (isEnum(apiItem)) {
		const attributes = extractEnumAttributes(apiItem);
		const enumNode = new EnumNode({ attributes, docs, name: attributes.name });

		return parent.addChild(enumNode);
	} else if (isEnumMember(apiItem)) {
		const attributes = extractEnumMemberAttributes(apiItem);
		const enumMemberNode = new EnumMemberNode({ attributes, docs, name: attributes.name });

		return parent.addChild(enumMemberNode);
	}
}

function extractDocs(apiItem: ApiItem): DocsAttributes {
	const docs: DocsAttributes = {};

	if (!(apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment)) return docs;

	const { summarySection, remarksBlock, returnsBlock, deprecatedBlock, typeParams, seeBlocks, params, customBlocks } =
		apiItem.tsdocComment;

	const defaultValueBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@defaultValue");
	const examplesBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@example");
	const sinceBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@since");
	const infoBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@info");
	const warningBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@warning");
	const errorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@error");
	const authorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@author");

	docs.summary = traverseDocNodes(summarySection);
	docs.remarks = traverseDocNodes(remarksBlock);
	docs.returns = traverseDocNodes(returnsBlock);
	docs.deprecated = traverseDocNodes(deprecatedBlock);

	if (typeParams.blocks.length > 0) {
		docs.typeParams = typeParams.blocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (params.blocks.length > 0) {
		docs.params = params.blocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (seeBlocks.length > 0) {
		docs.see = seeBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (examplesBlocks.length > 0) {
		docs.examples = examplesBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (defaultValueBlocks.length > 0) {
		docs.defaultValue = defaultValueBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (sinceBlocks.length > 0) {
		docs.since = sinceBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (infoBlocks.length > 0) {
		docs.infos = infoBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (warningBlocks.length > 0) {
		docs.warnings = warningBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (errorBlocks.length > 0) {
		docs.errors = errorBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	if (authorBlocks.length > 0) {
		docs.authors = authorBlocks
			.map((block) => traverseDocNodes(block))
			.filter((node): node is RootDocNode => node !== undefined);
	}

	return docs;
}

export { Documenter, traverseDocNodes };

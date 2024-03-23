import { ApiItem } from "@microsoft/api-extractor-model";

import { ApiNode } from "./api/ApiNode";
import { DocsAttributes } from "./docs/DocsAttributes";

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
import { DocsExtractor } from "./DocsExtractor";

namespace ApiExtractor {
	export function traverse(apiItem: ApiItem, parent: ApiNode) {
		let docs: DocsAttributes = DocsExtractor.extract(apiItem);
		let child: ApiNode | undefined = ApiExtractor.extract(apiItem, parent, docs);

		for (const member of apiItem.members) {
			ApiExtractor.traverse(member, child || parent);
		}
	}

	export function extract(apiItem: ApiItem, parent: ApiNode, docs: DocsAttributes): ApiNode | undefined {
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
}

export { ApiExtractor };

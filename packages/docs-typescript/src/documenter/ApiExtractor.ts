import { ApiItem } from "@microsoft/api-extractor-model";

import { ApiNode } from "./api/ApiNode.js";

import { extractPackageAttributes, PackageNode } from "./api/PackageNode.js";
import { extractNamespaceAttributes, NamespaceNode } from "./api/NamespaceNode.js";
import { ClassNode, extractClassAttributes } from "./api/class/ClassNode.js";
import { ConstructorNode, extractConstructorAttributes } from "./api/class/ConstructorNode.js";
import { extractPropertyAttributes, PropertyNode } from "./api/class/PropertyNode.js";
import { extractMethodAttributes, MethodNode } from "./api/class/MethodNode.js";
import { extractFunctionAttributes, FunctionNode } from "./api/FunctionNode.js";
import { extractVariableAttributes, VariableNode } from "./api/VariableNode.js";
import { extractInterfaceAttributes, InterfaceNode } from "./api/interface/InterfaceNode.js";
import {
	ConstructorSignatureNode,
	extractConstructorSignatureAttributes
} from "./api/interface/ConstructorSignatureNode.js";
import { extractPropertySignatureAttributes, PropertySignatureNode } from "./api/interface/PropertySignatureNode.js";
import { extractMethodSignatureAttributes, MethodSignatureNode } from "./api/interface/MethodSignatureNode.js";
import { extractIndexSignatureAttributes, IndexSignatureNode } from "./api/interface/IndexSignatureNode.js";
import { extractTypeAliasAttributes, TypeAliasNode } from "./api/TypeAliasNode.js";
import { EnumNode, extractEnumAttributes } from "./api/enum/EnumNode.js";
import { EnumMemberNode, extractEnumMemberAttributes } from "./api/enum/EnumMemberNode.js";

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
} from "./apiItemsMatchers.js";

namespace ApiExtractor {
	export function traverse(apiItem: ApiItem, parent: ApiNode) {
		let child: ApiNode | undefined = ApiExtractor.extract(apiItem, parent);

		for (const member of apiItem.members) {
			ApiExtractor.traverse(member, child || parent);
		}
	}

	export function extract(apiItem: ApiItem, parent: ApiNode): ApiNode | undefined {
		if (isPackage(apiItem)) {
			const attributes = extractPackageAttributes(apiItem);
			const packageNode = new PackageNode({ attributes, name: attributes.name });

			return parent.addChild(packageNode);
		}

		if (isNamespace(apiItem)) {
			const attributes = extractNamespaceAttributes(apiItem);
			const namespaceNode = new NamespaceNode({ attributes, name: attributes.name });

			return parent.addChild(namespaceNode);
		}

		if (isJSX(apiItem)) {
			// TODO: Implement
		}

		if (isReactHook(apiItem)) {
			// TODO: Implement
		}

		if (isProps(apiItem)) {
			// TODO: Implement
		}

		if (isClass(apiItem)) {
			const attributes = extractClassAttributes(apiItem);
			const classNode = new ClassNode({ attributes, name: attributes.name });

			return parent.addChild(classNode);
		}

		if (isConstructor(apiItem)) {
			const attributes = extractConstructorAttributes(apiItem);
			const constructorNode = new ConstructorNode({ attributes, name: attributes.name });

			return parent.addChild(constructorNode);
		}

		if (isProperty(apiItem)) {
			const attributes = extractPropertyAttributes(apiItem);
			const propertyNode = new PropertyNode({ attributes, name: attributes.name });

			return parent.addChild(propertyNode);
		}

		if (isMethod(apiItem)) {
			const attributes = extractMethodAttributes(apiItem);
			const methodNode = new MethodNode({ attributes, name: attributes.name });

			return parent.addChild(methodNode);
		}

		if (isFunction(apiItem)) {
			const attributes = extractFunctionAttributes(apiItem);
			const functionNode = new FunctionNode({ attributes, name: attributes.name });

			return parent.addChild(functionNode);
		}

		if (isVariable(apiItem)) {
			const attributes = extractVariableAttributes(apiItem);
			const variableNode = new VariableNode({ attributes, name: attributes.name });

			return parent.addChild(variableNode);
		}

		if (isInterface(apiItem)) {
			const attributes = extractInterfaceAttributes(apiItem);
			const interfaceNode = new InterfaceNode({ attributes, name: attributes.name });

			return parent.addChild(interfaceNode);
		}

		if (isConstructorSignature(apiItem)) {
			const attributes = extractConstructorSignatureAttributes(apiItem);
			const constructorSignatureNode = new ConstructorSignatureNode({ attributes, name: attributes.name });

			return parent.addChild(constructorSignatureNode);
		}

		if (isPropertySignature(apiItem)) {
			const attributes = extractPropertySignatureAttributes(apiItem);
			const propertySignatureNode = new PropertySignatureNode({ attributes, name: attributes.name });

			return parent.addChild(propertySignatureNode);
		}

		if (isMethodSignature(apiItem)) {
			const attributes = extractMethodSignatureAttributes(apiItem);
			const methodSignatureNode = new MethodSignatureNode({ attributes, name: attributes.name });

			return parent.addChild(methodSignatureNode);
		}

		if (isIndexSignature(apiItem)) {
			const attributes = extractIndexSignatureAttributes(apiItem);
			const indexSignatureNode = new IndexSignatureNode({ attributes, name: attributes.name });

			return parent.addChild(indexSignatureNode);
		}

		if (isTypeAlias(apiItem)) {
			const attributes = extractTypeAliasAttributes(apiItem);
			const typeAliasNode = new TypeAliasNode({ attributes, name: attributes.name });

			return parent.addChild(typeAliasNode);
		}

		if (isEnum(apiItem)) {
			const attributes = extractEnumAttributes(apiItem);
			const enumNode = new EnumNode({ attributes, name: attributes.name });

			return parent.addChild(enumNode);
		}

		if (isEnumMember(apiItem)) {
			const attributes = extractEnumMemberAttributes(apiItem);
			const enumMemberNode = new EnumMemberNode({ attributes, name: attributes.name });

			return parent.addChild(enumMemberNode);
		}
	}
}

export { ApiExtractor };

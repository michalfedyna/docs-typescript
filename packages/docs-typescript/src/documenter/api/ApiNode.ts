import { RootNode } from "./RootNode.js";
import { PackageNode } from "./PackageNode.js";
import { NamespaceNode } from "./NamespaceNode.js";
import { ClassNode } from "./class/ClassNode.js";
import { ConstructorNode } from "./class/ConstructorNode.js";
import { PropertyNode } from "./class/PropertyNode.js";
import { MethodNode } from "./class/MethodNode.js";
import { FunctionNode } from "./FunctionNode.js";
import { VariableNode } from "./VariableNode.js";
import { InterfaceNode } from "./interface/InterfaceNode.js";
import { ConstructorSignatureNode } from "./interface/ConstructorSignatureNode.js";
import { PropertySignatureNode } from "./interface/PropertySignatureNode.js";
import { MethodSignatureNode } from "./interface/MethodSignatureNode.js";
import { IndexSignatureNode } from "./interface/IndexSignatureNode.js";
import { TypeAliasNode } from "./TypeAliasNode.js";
import { EnumNode } from "./enum/EnumNode.js";
import { EnumMemberNode } from "./enum/EnumMemberNode.js";

enum ApiNodeType {
	ApiNode = "ApiNode",
	RootNode = "RootNode",
	PackageNode = "PackageNode",
	NamespaceNode = "NamespaceNode",
	ClassNode = "ClassNode",
	ConstructorNode = "ConstructorNode",
	PropertyNode = "PropertyNode",
	MethodNode = "MethodNode",
	FunctionNode = "FunctionNode",
	VariableNode = "VariableNode",
	InterfaceNode = "InterfaceNode",
	ConstructorSignatureNode = "ConstructorSignatureNode",
	PropertySignatureNode = "PropertySignatureNode",
	MethodSignatureNode = "MethodSignatureNode",
	IndexSignatureNode = "IndexSignatureNode",
	TypeAliasNode = "TypeAliasNode",
	EnumNode = "EnumNode",
	EnumMemberNode = "EnumMemberNode"
}

type CallbackArray = {
	[ApiNodeType.RootNode]?: (node: RootNode) => void;
	[ApiNodeType.PackageNode]?: (node: PackageNode) => void;
	[ApiNodeType.NamespaceNode]?: (node: NamespaceNode) => void;
	[ApiNodeType.ClassNode]?: (node: ClassNode) => void;
	[ApiNodeType.ConstructorNode]?: (node: ConstructorNode) => void;
	[ApiNodeType.PropertyNode]?: (node: PropertyNode) => void;
	[ApiNodeType.MethodNode]?: (node: MethodNode) => void;
	[ApiNodeType.FunctionNode]?: (node: FunctionNode) => void;
	[ApiNodeType.VariableNode]?: (node: VariableNode) => void;
	[ApiNodeType.InterfaceNode]?: (node: InterfaceNode) => void;
	[ApiNodeType.ConstructorSignatureNode]?: (node: ConstructorSignatureNode) => void;
	[ApiNodeType.PropertySignatureNode]?: (node: PropertySignatureNode) => void;
	[ApiNodeType.MethodSignatureNode]?: (node: MethodSignatureNode) => void;
	[ApiNodeType.IndexSignatureNode]?: (node: IndexSignatureNode) => void;
	[ApiNodeType.TypeAliasNode]?: (node: TypeAliasNode) => void;
	[ApiNodeType.EnumNode]?: (node: EnumNode) => void;
	[ApiNodeType.EnumMemberNode]?: (node: EnumMemberNode) => void;
};

interface ApiNodeValue<T> {
	name: string;
	attributes: T;
}

class ApiNode<T = unknown> {
	public type: ApiNodeType = ApiNodeType.ApiNode;
	public uri?: string;
	public value: ApiNodeValue<T>;

	public children: ApiNode[] = [];
	public parent?: ApiNode;

	constructor(value: ApiNodeValue<T>) {
		this.value = value;
	}

	public addChild<K extends ApiNode>(child: K): K {
		const index = this.children.push(child);
		child.parent = this;
		child.uri = this._createURI(child, this);
		return this.children[index - 1] as K;
	}

	public getRoot(): ApiNode {
		let node: ApiNode = this;
		while (node.parent) {
			node = node.parent;
		}
		return node;
	}

	public forEach(callback: ((node: ApiNode) => void) | CallbackArray): void {
		if (typeof callback === "function") {
			callback(this);
		} else {
			switch (this.type) {
				case ApiNodeType.RootNode:
					callback[ApiNodeType.RootNode]?.(this as RootNode);
					break;
				case ApiNodeType.PackageNode:
					callback[ApiNodeType.PackageNode]?.(this as PackageNode);
					break;
				case ApiNodeType.NamespaceNode:
					callback[ApiNodeType.NamespaceNode]?.(this as NamespaceNode);
					break;
				case ApiNodeType.ClassNode:
					callback[ApiNodeType.ClassNode]?.(this as ClassNode);
					break;
				case ApiNodeType.ConstructorNode:
					callback[ApiNodeType.ConstructorNode]?.(this as ConstructorNode);
					break;
				case ApiNodeType.PropertyNode:
					callback[ApiNodeType.PropertyNode]?.(this as PropertyNode);
					break;
				case ApiNodeType.MethodNode:
					callback[ApiNodeType.MethodNode]?.(this as MethodNode);
					break;
				case ApiNodeType.FunctionNode:
					callback[ApiNodeType.FunctionNode]?.(this as FunctionNode);
					break;
				case ApiNodeType.VariableNode:
					callback[ApiNodeType.VariableNode]?.(this as VariableNode);
					break;
				case ApiNodeType.InterfaceNode:
					callback[ApiNodeType.InterfaceNode]?.(this as InterfaceNode);
					break;
				case ApiNodeType.ConstructorSignatureNode:
					callback[ApiNodeType.ConstructorSignatureNode]?.(this as ConstructorSignatureNode);
					break;
				case ApiNodeType.PropertySignatureNode:
					callback[ApiNodeType.PropertySignatureNode]?.(this as PropertySignatureNode);
					break;
				case ApiNodeType.MethodSignatureNode:
					callback[ApiNodeType.MethodSignatureNode]?.(this as MethodSignatureNode);
					break;
				case ApiNodeType.IndexSignatureNode:
					callback[ApiNodeType.IndexSignatureNode]?.(this as IndexSignatureNode);
					break;
				case ApiNodeType.TypeAliasNode:
					callback[ApiNodeType.TypeAliasNode]?.(this as TypeAliasNode);
					break;
				case ApiNodeType.EnumNode:
					callback[ApiNodeType.EnumNode]?.(this as EnumNode);
					break;
				case ApiNodeType.EnumMemberNode:
					callback[ApiNodeType.EnumMemberNode]?.(this as EnumMemberNode);
					break;
			}
		}

		for (const child of this.children) {
			child.forEach(callback);
		}
	}

	public toObject(): object {
		return {
			type: this.type,
			uri: this.uri,
			name: this.value.name,
			attributes: this.value.attributes,
			children: this.children.map((child) => child.toObject())
		};
	}

	protected _createURI(child: ApiNode, parent?: ApiNode): string {
		const { name } = child.value;

		if (!parent) return child.value.name;

		if (child.type === ApiNodeType.VariableNode) return this._createURI(parent, parent.parent) + "/variables/" + name;

		if (child.type === ApiNodeType.FunctionNode) return this._createURI(parent, parent.parent) + "/functions/" + name;

		if (child.type === ApiNodeType.EnumNode) return this._createURI(parent, parent.parent) + "/enums/" + name;

		if (child.type === ApiNodeType.TypeAliasNode) return this._createURI(parent, parent.parent) + "/types/" + name;

		if (child.type === ApiNodeType.InterfaceNode) return this._createURI(parent, parent.parent) + "/interfaces/" + name;

		if (child.type === ApiNodeType.ClassNode) return this._createURI(parent, parent.parent) + "/classes/" + name;

		return this._createURI(parent, parent.parent) + "/" + name;
	}
}

export { ApiNode, ApiNodeType, ApiNodeValue };

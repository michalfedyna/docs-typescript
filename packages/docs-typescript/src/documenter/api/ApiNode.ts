import { DocsAttributes } from "../docs/DocsAttributes";
import { DocNode } from "../docs/DocNode";

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

interface ApiNodeValue<T> {
	name: string;
	attributes: T;
	docs: DocsAttributes;
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
		child.uri = this._createURI(child.value.name, this);
		return this.children[index - 1] as K;
	}

	public toObject(): object {
		// TODO: This is a temporary solution
		const docs = Object.entries(this.value.docs)
			.map((doc) => {
				if (doc[1] instanceof DocNode) return [[doc[0]], doc[1].toObject()];
			})
			.filter((doc) => doc) as [string, object][];

		return {
			type: this.type,
			uri: this.uri,
			name: this.value.name,
			attributes: this.value.attributes,
			docs: Object.fromEntries(docs),
			children: this.children.map((child) => child.toObject())
		};
	}

	protected _createURI(name: string, parent?: ApiNode): string {
		if (parent) {
			return this._createURI(parent.value.name, parent.parent) + "/" + name;
		}

		return name;
	}
}

export { ApiNode, ApiNodeType, ApiNodeValue };

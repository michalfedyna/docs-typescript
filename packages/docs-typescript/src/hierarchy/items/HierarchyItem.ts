import { DocsItem } from "../docs/DocsItem";

enum HierarchyItemType {
	EntryPointItem = "EntryPoint",
	ClassItem = "Class",
	ConstructorItem = "Constructor",
	ConstructorSignatureItem = "ConstructorSignature",
	FunctionItem = "Function",
	EnumItem = "Enum",
	EnumMemberItem = "EnumMember",
	HierarchyItem = "Hierarchy",
	HookItem = "Hook",
	IndexSignatureItem = "IndexSignature",
	InterfaceItem = "Interface",
	JSXItem = "JSX",
	MethodItem = "Method",
	MethodSignatureItem = "MethodSignature",
	NamespaceItem = "Namespace",
	PackageItem = "Package",
	PropertyItem = "Property",
	PropsItem = "Props",
	TypeAliasItem = "TypeAlias",
	VariableItem = "Variable",
	PropertySignatureItem = "PropertySignature"
}

class HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.HierarchyItem;
	public name: string;
	public uri: string;

	public docs?: DocsItem;

	public children: HierarchyItem[] = [];
	public parent: HierarchyItem | undefined = undefined;

	constructor(name: string, parent?: HierarchyItem) {
		this.name = name;
		this.uri = this._createUri(name, parent);

		if (parent) this.parent = parent;
	}

	protected _createUri(name: string, parent?: HierarchyItem): string {
		if (parent) {
			return this._createUri(parent.name, parent.parent) + "/" + name;
		}

		return name;
	}

	public addChild<T extends HierarchyItem>(child: T): T {
		const length = this.children.push(child);
		return this.children[length - 1] as T;
	}

	// TODO: Fix to first go to root and then find the item
	public findByUrl(url: string): HierarchyItem | undefined {
		if (this.uri === url) return this;

		for (const child of this.children) {
			const result = child.findByUrl(url);
			if (result) {
				return result;
			}
		}

		return undefined;
	}

	public toObject(): object {
		return {
			type: this.type,
			name: this.name,
			uri: this.uri,
			children: this.children.map((child) => child.toObject())
		};
	}
}

export { HierarchyItem, HierarchyItemType };

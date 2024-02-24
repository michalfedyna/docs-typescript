import { DocsItem } from "./DocsItem";

enum HierarchyItemType {
	HierarchyItem = "Hierarchy",
	PackageItem = "Package",
	ClassItem = "Class",
	ConstructorItem = "Constructor",
	PropertyItem = "Property",
	MethodItem = "Method",
	InterfaceItem = "Interface",
	VariableItem = "Variable",
	NamespaceItem = "Namespace",
	JSXItem = "JSX",
	PropsItem = "Props",
	HookItem = "Hook"
}

class HierarchyItem {
	protected _name: string;
	protected _uri: string;
	protected _type: HierarchyItemType;
	protected _docs?: DocsItem;

	protected _children: HierarchyItem[] = [];
	protected _parent: HierarchyItem | undefined = undefined;

	constructor(name: string, parent?: HierarchyItem) {
		this._type = HierarchyItemType.HierarchyItem;
		this._name = name;
		this._parent = parent;
		this._uri = this._createUri(name, parent);
	}

	protected _createUri(name: string, parent?: HierarchyItem): string {
		if (parent) {
			return this._createUri(parent.name, parent.parent) + "/" + name;
		}

		return name;
	}

	public addChild<T extends HierarchyItem>(child: T): T {
		this._children.push(child);
		return child;
	}

	public addDocs(docs: DocsItem): void {
		this._docs = docs;
	}

	public get type(): HierarchyItemType {
		return this._type;
	}

	public get name(): string {
		return this._name;
	}

	public get uri(): string {
		return this._uri;
	}

	public get children(): HierarchyItem[] {
		return this._children;
	}

	public get parent(): HierarchyItem | undefined {
		return this._parent;
	}

	public findByUrl(url: string): HierarchyItem | undefined {
		if (this._uri === url) return this;

		for (const child of this._children) {
			const result = child.findByUrl(url);
			if (result) {
				return result;
			}
		}

		return undefined;
	}

	public toObject(): object {
		return {
			name: this._name,
			url: this._uri,
			type: this._type,
			children: this._children.map((child) => child.toObject())
		};
	}
}

export { HierarchyItem, HierarchyItemType };

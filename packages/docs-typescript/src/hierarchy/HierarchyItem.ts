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
	protected _url: string;
	protected _type: HierarchyItemType;

	protected _children: HierarchyItem[] = [];
	protected _parent: HierarchyItem | undefined = undefined;

	constructor(name: string, parent?: HierarchyItem) {
		this._type = HierarchyItemType.HierarchyItem;
		this._name = name;
		this._parent = parent;
		this._url = this._createUrl(name, parent);
	}

	protected _createUrl(name: string, parent?: HierarchyItem): string {
		if (parent) {
			return this._createUrl(parent.name, parent.parent) + "/" + name;
		}

		return name;
	}

	public addChild<T extends HierarchyItem>(child: T): T {
		this._children.push(child);
		return child;
	}

	public get type(): HierarchyItemType {
		return this._type;
	}

	public get name(): string {
		return this._name;
	}

	public get url(): string {
		return this._url;
	}

	public get children(): HierarchyItem[] {
		return this._children;
	}

	public get parent(): HierarchyItem | undefined {
		return this._parent;
	}

	public findByUrl(url: string): HierarchyItem | undefined {
		if (this._url === url) return this;

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
			url: this._url,
			type: this._type,
			children: this._children.map((child) => child.toObject())
		};
	}
}

export { HierarchyItem, HierarchyItemType };

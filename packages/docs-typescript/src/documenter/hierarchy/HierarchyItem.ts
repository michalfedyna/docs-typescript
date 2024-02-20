enum HierarchyItemType {
  ClassItem = "Class",
  InterfaceItem = "Interface",
  VariableItem = "Variable",
  NamespaceItem = "Namespace",
}

class HierarchyItem {
  private _url: string;
  private _type: HierarchyItemType;
  private _name: string;

  constructor(type: HierarchyItemType, name: string, url: string) {
    this._type = type;
    this._name = name;
    this._url = url;
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
}

export { HierarchyItem, HierarchyItemType };

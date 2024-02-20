import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class Hierarchy {
  private _children: HierarchyItem[];

  constructor() {
    this._children = [];
  }

  public addChild(type: HierarchyItemType, name: string, url: string): void {
    const child: HierarchyItem = new HierarchyItem(type, name, url);
    this._children.push(child);
  }

  public addNamespace(name: string, url: string): void {
    this.addChild(HierarchyItemType.NamespaceItem, name, url);
  }

  public debugPrint(): void {
    for (const child of this._children) {
      console.log(`(${child.type}): ${child.name} | url: ${child.url}`);
    }
  }
}

export { Hierarchy };

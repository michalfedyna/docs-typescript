import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class NamespaceItem extends HierarchyItem {
  constructor(name: string, parent?: HierarchyItem) {
    super(name, parent);
    this._type = HierarchyItemType.NamespaceItem;
  }
}

export { NamespaceItem };

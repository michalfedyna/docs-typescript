import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class PackageItem extends HierarchyItem {
  constructor(name: string, parent?: HierarchyItem) {
    super(name, parent);
    this._type = HierarchyItemType.PackageItem;
  }
}

export { PackageItem };

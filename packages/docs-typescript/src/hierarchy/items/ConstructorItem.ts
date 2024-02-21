import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class ConstructorItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.ConstructorItem;
	}
}

export { ConstructorItem };

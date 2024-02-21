import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class ClassItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.ClassItem;
	}
}

export { ClassItem };

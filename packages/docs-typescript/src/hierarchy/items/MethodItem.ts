import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class MethodItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.MethodItem;
	}
}

export { MethodItem };

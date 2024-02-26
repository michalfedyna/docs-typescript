import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class HookItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.HookItem;
	}
}

export { HookItem };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class HookItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.HookItem;

	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
	}
}

export { HookItem };

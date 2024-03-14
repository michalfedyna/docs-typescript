import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class JSXItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.JSXItem;

	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
	}
}

export { JSXItem };

import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class PropsItem extends HierarchyItem {
	public type: HierarchyItemType = HierarchyItemType.PropsItem;

	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
	}
}

export { PropsItem };

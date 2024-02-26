import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";

class PropsItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.PropsItem;
	}
}

export { PropsItem };

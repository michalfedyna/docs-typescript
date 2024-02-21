import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class PropertyItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = HierarchyItemType.PropertyItem;
	}
}

export { PropertyItem };

import { HierarchyItem, HierarchyItemType } from "../HierarchyItem";

class JSXItem extends HierarchyItem {
	constructor(name: string, parent?: HierarchyItem) {
		super(name, parent);
		this._type = "JSXItem";
	}
}

export { JSXItem };

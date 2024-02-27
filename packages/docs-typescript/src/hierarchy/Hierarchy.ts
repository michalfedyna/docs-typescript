import { HierarchyItem } from "./items/HierarchyItem";

class Hierarchy extends HierarchyItem {
	public addItem<T extends HierarchyItem>(item: T, parent?: HierarchyItem): T {
		console.log("adding item", item.name, parent?.name);
		if (parent) return parent.addChild(item);
		return this.addChild(item);
	}
}

export { Hierarchy };

import { Emitter } from "./Emitter";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";

class HTMLEmitter {
	emit(items: HierarchyItem[]): void {
		for (const item of items) {
			this.page(item);
		}
	}

	page(item: HierarchyItem): { url: string; content: string } {
		return {
			url: "",
			content: ""
		};
	}
}

export { HTMLEmitter };

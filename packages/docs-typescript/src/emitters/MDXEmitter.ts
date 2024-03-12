import { Emitter } from "./Emitter";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";

class MDXEmitter extends Emitter {
	emit(items: HierarchyItem[]): void {
		for (const item of items) {
			this.page(item);
		}
	}

	page(item: HierarchyItem): { url: string; content: string } {
		if (item.children.length > 0) {
		}

		return {
			url: "",
			content: ""
		};
	}
}

export { MDXEmitter };

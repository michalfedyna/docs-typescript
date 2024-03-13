import { Emitter } from "./Emitter";
import { HierarchyItem } from "../hierarchy/items/HierarchyItem";

class MDXEmitter {
	emit(items: HierarchyItem): void {
		this.emitPage(items);
	}

	emitPage(item: HierarchyItem): { url: string; content: string } {
		for (const child of item.children) {
			this.emitPage(child);
		}

		return {
			url: "",
			content: ""
		};
	}
}

export { MDXEmitter };

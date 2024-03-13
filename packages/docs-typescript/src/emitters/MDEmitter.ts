import { Emitter } from "./Emitter";
import { HierarchyItem, HierarchyItemType } from "../hierarchy/items/HierarchyItem";
import { EntryPointItem } from "../hierarchy/items/EntryPointItem";
import * as fs from "fs";
import path from "path";
import { MDWriter } from "./MDWriter";
import { ClassItem } from "../hierarchy/items/ClassItem";

class MDEmitter extends Emitter {
	emit(item: HierarchyItem): void {
		this._emitPage(item);
	}

	protected _emitPage(item: HierarchyItem) {
		for (const child of item.children) {
			this._emitPage(child);
		}

		switch (item.type) {
			case HierarchyItemType.EntryPointItem: {
				break;
			}
			case HierarchyItemType.NamespaceItem: {
				break;
			}
			case HierarchyItemType.ClassItem: {
				const classItem = item as ClassItem;
				const writer = new MDWriter();

				writer.header(1, classItem.attributes.displayName);

				this._toFile(writer.toString(), classItem.uri);
				break;
			}
		}
	}

	protected _toFile(content: string, url: string): void {
		const filePath = path.resolve(process.cwd(), this._config.outputPath, url + ".md");
		if (!fs.existsSync(path.dirname(filePath))) fs.mkdirSync(path.dirname(filePath), { recursive: true });

		fs.writeFileSync(filePath, content);
	}
}

export { MDEmitter };

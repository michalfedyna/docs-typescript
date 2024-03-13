import * as fs from "fs";
import path from "path";

import { ClassItem } from "../hierarchy/items/ClassItem";
import { ConstructorItem } from "../hierarchy/items/ConstructorItem";
import { Debug } from "../utils/Debug";
import { Emitter } from "./Emitter";
import { HierarchyItem, HierarchyItemType } from "../hierarchy/items/HierarchyItem";
import { MDWriter } from "./MDWriter";
import { Template } from "../utils/Template";

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
			case HierarchyItemType.PackageItem: {
				break;
			}
			case HierarchyItemType.NamespaceItem: {
				break;
			}
			case HierarchyItemType.ClassItem: {
				const classItem = item as ClassItem;

				const context = {
					name: classItem.attributes.displayName,
					signature: classItem.attributes.signature,
					isAbstract: classItem.attributes.isAbstract
				};

				const content = new Template(this._config.outputFormat, "class").render(context);

				this._toFile(content, classItem.uri);
				break;
			}
			case HierarchyItemType.ConstructorItem: {
				const constructorItem = item as ConstructorItem;
				const writer = new MDWriter();

				writer.header(1, constructorItem.parent?.name + " Constructor");

				writer.header(2, "Signature");
				writer.code("typescript", constructorItem.attributes.signature);

				this._toFile(writer.toString(), constructorItem.uri);
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

import * as fs from "fs";
import path from "path";

import { ClassItem } from "../hierarchy/items/ClassItem";
import { ConstructorItem } from "../hierarchy/items/ConstructorItem";
import { Emitter } from "./Emitter";
import { HierarchyItem, HierarchyItemType } from "../hierarchy/items/HierarchyItem";
import { Template } from "../utils/Template";
import { ClassContext } from "../templates/markdown/class";
import { ConstructorContext } from "../templates/markdown/constructor";

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
				const constructorItem = classItem.children[0] as ConstructorItem;

				const context: ClassContext = {
					name: classItem.attributes.displayName,
					signature: classItem.attributes.signature,
					isAbstract: classItem.attributes.isAbstract,
					constructorContext: {
						name: constructorItem.attributes.displayName,
						signature: constructorItem.attributes.signature
					}
				};

				const content = new Template("markdown", "class").render(context);
				this._toFile(content, classItem.uri);
				break;
			}
			case HierarchyItemType.ConstructorItem: {
				const constructorItem = item as ConstructorItem;

				const context: ConstructorContext = {
					name: constructorItem.attributes.displayName,
					signature: constructorItem.attributes.signature
				};

				const content = new Template("markdown", "constructor").render(context);
				this._toFile(content, constructorItem.uri);
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

import * as fs from "fs";
import path from "path";

import { Emitter } from "./Emitter";
import { Template } from "./Template";
import { ClassContext } from "../templates/markdown/class";
import { ConstructorContext } from "../templates/markdown/constructor";
import { PackageContext } from "../templates/markdown/package";
import { RootNode } from "../documenter/api/RootNode";
import { ApiNodeType } from "../documenter/tree/ApiNode";
import { PackageNode } from "../documenter/api/PackageNode";
import { TreeNode } from "../documenter/tree/TreeNode";
import { NamespaceNode } from "../documenter/api/NamespaceNode";
import { ClassNode } from "../documenter/api/ClassNode";
import { ConstructorNode } from "../documenter/api/ConstructorNode";

class MDEmitter extends Emitter {
	emit(item: RootNode): void {
		this._emitPage(item);
	}

	protected _emitPage(item: TreeNode) {
		for (const child of item.children) {
			this._emitPage(child);
		}

		switch (item.type) {
			case ApiNodeType.PackageNode: {
				const packageItem = item as PackageNode;
				const context: PackageContext = {};

				const content = new Template("markdown", "package").render(context);
				this._toFile(content, packageItem.uri);

				break;
			}
			case ApiNodeType.NamespaceNode: {
				const namespaceItem = item as NamespaceNode;

				break;
			}
			case ApiNodeType.ClassNode: {
				const classItem = item as ClassNode;
				const constructorItems = classItem.children
					.map((child) => (child instanceof ConstructorNode ? child : null))
					.filter((child) => !!child) as ConstructorNode[];

				const context: ClassContext = {
					attributes: classItem.value.attributes,
					docs: classItem.value.docs,
					constructors: constructorItems.map((constructorItem) => ({
						attributes: constructorItem.value.attributes,
						docs: constructorItem.value.docs
					}))
				};

				const content = new Template("markdown", "class").render(context);
				this._toFile(content, classItem.uri);

				break;
			}
			case ApiNodeType.ConstructorNode: {
				const constructorItem = item as ConstructorNode;

				const context: ConstructorContext = {
					attributes: constructorItem.value.attributes,
					docs: constructorItem.value.docs
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

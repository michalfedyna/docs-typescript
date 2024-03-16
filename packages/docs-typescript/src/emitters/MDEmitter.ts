import * as fs from "fs";
import path from "path";

import { Emitter } from "./Emitter";
import { Template } from "./Template";
import { RootNode } from "../documenter/api/RootNode";
import { ApiNode, ApiNodeType } from "../documenter/api/ApiNode";
import { VariableNode } from "../documenter/api/VariableNode";

class MDEmitter extends Emitter {
	emit(item: RootNode): void {
		this._emitPage(item);
	}

	protected _emitPage(item: ApiNode) {
		for (const child of item.children) {
			this._emitPage(child);
		}

		switch (item.type) {
			case ApiNodeType.VariableNode: {
				const variableItem = item as VariableNode;
				const context = {
					attributes: variableItem.value.attributes,
					docs: {}
				};

				const content = new Template("markdown", "variable").render(context);
				this._toFile(content, variableItem.uri);

				break;
			}
			case ApiNodeType.FunctionNode: {
				break;
			}
			// case ApiNodeType.PackageNode: {
			// 	const packageItem = item as PackageNode;
			// 	const context: PackageContext = {};
			//
			// 	const content = new Template("markdown", "package").render(context);
			// 	this._toFile(content, packageItem.uri);
			//
			// 	break;
			// }
			// case ApiNodeType.NamespaceNode: {
			// 	const namespaceItem = item as NamespaceNode;
			//
			// 	break;
			// }
			// case ApiNodeType.ClassNode: {
			// 	const classItem = item as ClassNode;
			//
			// 	const context: ClassContext = {
			// 		attributes: classItem.value.attributes,
			// 		docs: {}
			// 	};
			//
			// 	const content = new Template("markdown", "class").render(context);
			// 	this._toFile(content, classItem.uri);
			//
			// 	break;
			// }
			// case ApiNodeType.ConstructorNode: {
			// 	const constructorItem = item as ConstructorNode;
			//
			// 	const context: ConstructorContext = {
			// 		attributes: constructorItem.value.attributes,
			// 		docs: {}
			// 	};
			//
			// 	const content = new Template("markdown", "constructor").render(context);
			// 	this._toFile(content, constructorItem.uri);
			//
			// 	break;
			// }
		}
	}

	protected _toFile(content: string, url?: string): void {
		if (!url) throw new Error("URL is required to write to file");

		const filePath = path.resolve(process.cwd(), this.config.rootPath + this.config.outputPath + url + ".md");

		if (!fs.existsSync(path.dirname(filePath))) fs.mkdirSync(path.dirname(filePath), { recursive: true });

		fs.writeFileSync(filePath, content);
	}
}

export { MDEmitter };

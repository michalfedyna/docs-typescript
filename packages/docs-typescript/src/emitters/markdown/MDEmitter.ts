import * as fs from "fs";
import path from "path";

import { Emitter } from "../Emitter";
import { Template } from "../Template";
import { RootNode } from "../../documenter/api/RootNode";
import { ApiNode, ApiNodeType } from "../../documenter/api/ApiNode";

import { VariableNode } from "../../documenter/api/VariableNode";
import { FunctionNode } from "../../documenter/api/FunctionNode";
import { ClassNode } from "../../documenter/api/class/ClassNode";
import { PackageNode } from "../../documenter/api/PackageNode";
import { NamespaceNode } from "../../documenter/api/NamespaceNode";

import { buildMarkdownVariableContext } from "./MarkdownVariableContext";
import { buildMarkdownFunctionContext } from "./MarkdownFunctionContext";
import { buildMarkdownPackageContext } from "./MarkdownPackageContext";
import { buildMarkdownNamespaceContext } from "./MarkdownNamespaceContext";

class MDEmitter extends Emitter {
	public readonly format = "markdown";

	emit(item: RootNode): void {
		this._emitPage(item);
	}

	protected _emitPage(item: ApiNode) {
		for (const child of item.children) {
			this._emitPage(child);
		}

		switch (item.type) {
			case ApiNodeType.PackageNode: {
				const packageItem = item as PackageNode;
				const [context, template] = buildMarkdownPackageContext(packageItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, packageItem.uri);
				break;
			}
			case ApiNodeType.NamespaceNode: {
				const namespaceItem = item as NamespaceNode;
				const [context, template] = buildMarkdownNamespaceContext(namespaceItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, namespaceItem.uri);
				break;
			}
			case ApiNodeType.ClassNode: {
				const classItem = item as ClassNode;

				break;
			}
			case ApiNodeType.VariableNode: {
				const variableItem = item as VariableNode;
				const [context, template] = buildMarkdownVariableContext(variableItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, variableItem.uri);

				break;
			}
			case ApiNodeType.FunctionNode: {
				const functionItem = item as FunctionNode;
				const [context, template] = buildMarkdownFunctionContext(functionItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, functionItem.uri);
				break;
			}
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

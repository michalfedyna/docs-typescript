import * as fs from "fs";
import path from "path";
import prettier from "@prettier/sync";

import { Emitter } from "../Emitter";
import { Template } from "../Template";
import { RootNode } from "../../documenter/api/RootNode";
import { ApiNode, ApiNodeType } from "../../documenter/api/ApiNode";

import { VariableNode } from "../../documenter/api/VariableNode";
import { FunctionNode } from "../../documenter/api/FunctionNode";
import { ClassNode } from "../../documenter/api/class/ClassNode";
import { PackageNode } from "../../documenter/api/PackageNode";
import { NamespaceNode } from "../../documenter/api/NamespaceNode";
import { TypeAliasNode } from "../../documenter/api/TypeAliasNode";
import { EnumNode } from "../../documenter/api/enum/EnumNode";

import { buildMDVariableContext } from "./MDVariableContext";
import { buildMDFunctionContext } from "./MDFunctionContext";
import { buildMDPackageContext } from "./MDPackageContext";
import { buildMDNamespaceContext } from "./MDNamespaceContext";
import { buildMDTypeAliasContext } from "./MDTypeAliasContext";
import { buildMDEnumContext } from "./MDEnumContext";
import { buildMDClassContext } from "./MDClassContext";

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
				const [context, template] = buildMDPackageContext(packageItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, packageItem.uri);
				break;
			}
			case ApiNodeType.NamespaceNode: {
				// TODO:
				const namespaceItem = item as NamespaceNode;
				const [context, template] = buildMDNamespaceContext(namespaceItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, namespaceItem.uri);
				break;
			}
			case ApiNodeType.ClassNode: {
				const classItem = item as ClassNode;
				const [context, template] = buildMDClassContext(classItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, classItem.uri);
				break;
			}
			case ApiNodeType.InterfaceNode: {
				// TODO:
				break;
			}
			case ApiNodeType.VariableNode: {
				const variableItem = item as VariableNode;
				const [context, template] = buildMDVariableContext(variableItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, variableItem.uri);
				break;
			}
			case ApiNodeType.FunctionNode: {
				const functionItem = item as FunctionNode;
				const [context, template] = buildMDFunctionContext(functionItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, functionItem.uri);
				break;
			}
			case ApiNodeType.TypeAliasNode: {
				const typeAliasItem = item as TypeAliasNode;
				const [context, template] = buildMDTypeAliasContext(typeAliasItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, typeAliasItem.uri);
				break;
			}
			case ApiNodeType.EnumNode: {
				const enumItem = item as EnumNode;
				const [context, template] = buildMDEnumContext(enumItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, enumItem.uri);
				break;
			}
		}
	}

	protected _toFile(content: string, url?: string): void {
		if (!url) throw new Error("URL is required to write to file");

		const filePath = path.resolve(process.cwd(), this.config.rootPath + this.config.outputPath + url + ".md");
		console.log("Path", filePath);

		if (!fs.existsSync(path.dirname(filePath))) fs.mkdirSync(path.dirname(filePath), { recursive: true });

		const formatedContent = prettier.format(content, { parser: "markdown" });
		fs.writeFileSync(filePath, formatedContent);
	}
}

export { MDEmitter };

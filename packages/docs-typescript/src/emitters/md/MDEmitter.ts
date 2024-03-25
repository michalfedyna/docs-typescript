import * as fs from "fs";
import path from "path";
import prettier from "@prettier/sync";

import { Emitter } from "../Emitter.js";
import { Template } from "../Template.js";
import { RootNode } from "../../documenter/api/RootNode.js";
import { ApiNode, ApiNodeType } from "../../documenter/api/ApiNode.js";

import { VariableNode } from "../../documenter/api/VariableNode.js";
import { FunctionNode } from "../../documenter/api/FunctionNode.js";
import { ClassNode } from "../../documenter/api/class/ClassNode.js";
import { PackageNode } from "../../documenter/api/PackageNode.js";
import { NamespaceNode } from "../../documenter/api/NamespaceNode.js";
import { TypeAliasNode } from "../../documenter/api/TypeAliasNode.js";
import { EnumNode } from "../../documenter/api/enum/EnumNode.js";

import { buildMDVariableContext } from "./MDVariableContext.js";
import { buildMDFunctionContext } from "./MDFunctionContext.js";
import { buildMDPackageContext } from "./MDPackageContext.js";
import { buildMDNamespaceContext } from "./MDNamespaceContext.js";
import { buildMDTypeAliasContext } from "./MDTypeAliasContext.js";
import { buildMDEnumContext } from "./MDEnumContext.js";
import { buildMDClassContext } from "./MDClassContext.js";
import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode.js";
import { buildMDInterfaceContext } from "./MDInterfaceContext.js";

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
				const interfaceItem = item as InterfaceNode;
				const [context, template] = buildMDInterfaceContext(interfaceItem);

				const content = new Template(this.format, template).render(context);
				this._toFile(content, interfaceItem.uri);
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

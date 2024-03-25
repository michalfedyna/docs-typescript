import fs from "fs";
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
import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode.js";

import { buildMDVariableContext } from "./MDVariableContext.js";
import { buildMDFunctionContext } from "./MDFunctionContext.js";
import { buildMDPackageContext } from "./MDPackageContext.js";
import { buildMDNamespaceContext } from "./MDNamespaceContext.js";
import { buildMDTypeAliasContext } from "./MDTypeAliasContext.js";
import { buildMDEnumContext } from "./MDEnumContext.js";
import { buildMDClassContext } from "./MDClassContext.js";
import { buildMDInterfaceContext } from "./MDInterfaceContext.js";

type FilesArray = { path: string; content: string }[];

class MDEmitter extends Emitter {
	public readonly format = "markdown";

	emit(item: RootNode) {
		const files: FilesArray = [];

		item.forEach((node) => {
			const file = this._emitPage(node);
			if (file) files.push(file);
		});

		for (const file of files) {
			this._toFile(file.content, file.path);
		}
	}

	protected _emitPage(item: ApiNode): { path: string; content: string } | void {
		switch (item.type) {
			case ApiNodeType.PackageNode: {
				const packageItem = item as PackageNode;
				const [context, template] = buildMDPackageContext(packageItem);

				const content = new Template(this.format, template).render(context);
				const path = packageItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.NamespaceNode: {
				// TODO:
				const namespaceItem = item as NamespaceNode;
				const [context, template] = buildMDNamespaceContext(namespaceItem);

				const content = new Template(this.format, template).render(context);
				const path = namespaceItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.ClassNode: {
				const classItem = item as ClassNode;
				const [context, template] = buildMDClassContext(classItem);

				const content = new Template(this.format, template).render(context);
				const path = classItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.InterfaceNode: {
				const interfaceItem = item as InterfaceNode;
				const [context, template] = buildMDInterfaceContext(interfaceItem);

				const content = new Template(this.format, template).render(context);
				const path = interfaceItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.VariableNode: {
				const variableItem = item as VariableNode;
				const [context, template] = buildMDVariableContext(variableItem);

				const content = new Template(this.format, template).render(context);
				const path = variableItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.FunctionNode: {
				const functionItem = item as FunctionNode;
				const [context, template] = buildMDFunctionContext(functionItem);

				const content = new Template(this.format, template).render(context);
				const path = functionItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.TypeAliasNode: {
				const typeAliasItem = item as TypeAliasNode;
				const [context, template] = buildMDTypeAliasContext(typeAliasItem);

				const content = new Template(this.format, template).render(context);
				const path = typeAliasItem.uri as string;

				return { content, path };
			}
			case ApiNodeType.EnumNode: {
				const enumItem = item as EnumNode;
				const [context, template] = buildMDEnumContext(enumItem);

				const content = new Template(this.format, template).render(context);
				const path = enumItem.uri as string;

				return { content, path };
			}
		}
	}

	protected _toFile(content: string, url: string): void {
		const filePath = path.resolve(process.cwd(), this.config.rootPath + this.config.outputPath + url + ".md");

		if (!fs.existsSync(path.dirname(filePath))) fs.mkdirSync(path.dirname(filePath), { recursive: true });

		const formatedContent = prettier.format(content, { parser: "markdown" });
		fs.writeFileSync(filePath, formatedContent);
	}
}

export { MDEmitter };

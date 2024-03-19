import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { PackageNode } from "../../documenter/api/PackageNode";
import { ApiNodeType } from "../../documenter/api/ApiNode";
import { FunctionNode } from "../../documenter/api/FunctionNode";
import { VariableNode } from "../../documenter/api/VariableNode";
import { ClassNode } from "../../documenter/api/class/ClassNode";
import { InterfaceNode } from "../../documenter/api/interface/InterfaceNode";
import { TypeAliasNode } from "../../documenter/api/TypeAliasNode";
import { EnumNode } from "../../documenter/api/enum/EnumNode";
import { MarkdownMembersContext } from "./MarkdownMembersContext";

interface MarkdownPackageContext {
	name: string;
	members: MarkdownMembersContext;
	docs: MarkdownDocsContext;
}

function buildMarkdownPackageContext(packageNode: PackageNode): HandlebarsMarkdownContext<MarkdownPackageContext> {
	const { name } = packageNode.value.attributes;
	const members: MarkdownMembersContext = {};
	const docs = buildMarkdownDocsContext(packageNode.value.docs);

	packageNode.forEach({
		[ApiNodeType.FunctionNode]: (functionNode) => {
			if (!members.functions) {
				members.functions = { members: [], name: "Functions" };
			}

			const attributes = {
				name: functionNode.value.name,
				url: functionNode.uri || "",
				signature: functionNode.value.attributes.signature
			};

			members.functions.members.push(attributes);
		},
		[ApiNodeType.VariableNode]: (variableNode) => {
			if (!members.variables) {
				members.variables = { members: [], name: "Variables" };
			}

			const attributes = {
				name: variableNode.value.name,
				url: variableNode.uri || "",
				signature: variableNode.value.attributes.signature
			};

			members.variables.members.push(attributes);
		},
		[ApiNodeType.ClassNode]: (classNode) => {
			if (!members.classes) {
				members.classes = { members: [], name: "Classes" };
			}

			const attributes = {
				name: classNode.value.name,

				url: classNode.uri || "",
				signature: classNode.value.attributes.signature
			};

			members.classes.members.push(attributes);
		}
	});

	/* packageNode.forEach((node) => {
		switch (node.type) {
			case ApiNodeType.FunctionNode: {
				if (!members.functions) {
					members.functions = { members: [], name: "Functions" };
				}

				const functionNode = node as FunctionNode;
				const attributes = {
					name: functionNode.value.name,
					url: functionNode.uri || "",
					signature: functionNode.value.attributes.signature
				};

				members.functions.members.push(attributes);
				break;
			}
			case ApiNodeType.VariableNode: {
				if (!members.variables) {
					members.variables = { members: [], name: "Variables" };
				}

				const variableNode = node as VariableNode;
				const attributes = {
					name: variableNode.value.name,
					url: variableNode.uri || "",
					signature: variableNode.value.attributes.signature
				};

				members.variables.members.push(attributes);
				break;
			}
			case ApiNodeType.ClassNode: {
				if (!members.classes) {
					members.classes = { members: [], name: "Classes" };
				}

				const classNode = node as ClassNode;
				const attributes = {
					name: classNode.value.name,

					url: classNode.uri || "",
					signature: classNode.value.attributes.signature
				};

				members.classes.members.push(attributes);

				break;
			}
			case ApiNodeType.InterfaceNode: {
				if (!members.interfaces) {
					members.interfaces = { members: [], name: "Interfaces" };
				}

				const interfaceNode = node as InterfaceNode;
				const attributes = {
					name: interfaceNode.value.name,
					url: interfaceNode.uri || "",
					signature: interfaceNode.value.attributes.signature
				};

				members.interfaces.members.push(attributes);

				break;
			}
			case ApiNodeType.TypeAliasNode: {
				if (!members.typeAliases) {
					members.typeAliases = { members: [], name: "Type Aliases" };
				}

				const typeAliasNode = node as TypeAliasNode;
				const attributes = {
					name: typeAliasNode.value.name,
					url: typeAliasNode.uri || "",
					signature: typeAliasNode.value.attributes.signature
				};

				members.typeAliases.members.push(attributes);
				break;
			}
			case ApiNodeType.EnumNode: {
				if (!members.enums) {
					members.enums = { members: [], name: "Enums" };
				}

				const enumNode = node as EnumNode;
				const attributes = {
					name: enumNode.value.name,
					url: enumNode.uri || "",
					signature: enumNode.value.attributes.signature
				};

				members.enums.members.push(attributes);
				break;
			}
		}
	}); */

	Object.entries(members).forEach(([_, value]) => {
		value.members.sort((a, b) => a.name.localeCompare(b.name));
	});

	return [
		{
			docs,
			name,
			members
		},
		"package"
	];
}

export { MarkdownPackageContext, buildMarkdownPackageContext };

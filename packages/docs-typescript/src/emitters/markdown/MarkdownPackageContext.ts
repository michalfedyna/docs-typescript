import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { MarkdownMembersContext, Member } from "./MarkdownMembersContext";
import { PackageNode } from "../../documenter/api/PackageNode";
import { ApiNodeType } from "../../documenter/api/ApiNode";

interface MarkdownPackageContext {
	name: string;
	members: MarkdownMembersContext;
	docs: MarkdownDocsContext;
}

function buildMarkdownPackageContext(packageNode: PackageNode): HandlebarsMarkdownContext<MarkdownPackageContext> {
	const { name } = packageNode.value.attributes;
	const members: MarkdownMembersContext = {};
	const docs = buildMarkdownDocsContext(packageNode.value.attributes.docs);

	packageNode.forEach({
		[ApiNodeType.FunctionNode]: (functionNode) => {
			if (!members.functions) {
				members.functions = { members: [], name: "Functions" };
			}

			const attributes: Member = {
				name: functionNode.value.name,
				url: functionNode.uri || "",
				signature: functionNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(functionNode.value.attributes.docs).summary
			};

			members.functions.members.push(attributes);
		},
		[ApiNodeType.VariableNode]: (variableNode) => {
			if (!members.variables) {
				members.variables = { members: [], name: "Variables" };
			}

			const attributes: Member = {
				name: variableNode.value.name,
				url: variableNode.uri || "",
				signature: variableNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(variableNode.value.attributes.docs).summary
			};

			members.variables.members.push(attributes);
		},
		[ApiNodeType.ClassNode]: (classNode) => {
			if (!members.classes) {
				members.classes = { members: [], name: "Classes" };
			}

			const attributes: Member = {
				name: classNode.value.name,
				url: classNode.uri || "",
				signature: classNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(classNode.value.attributes.docs).summary
			};

			members.classes.members.push(attributes);
		},
		[ApiNodeType.InterfaceNode]: (interfaceNode) => {
			if (!members.interfaces) {
				members.interfaces = { members: [], name: "Interfaces" };
			}

			const attributes: Member = {
				name: interfaceNode.value.name,
				url: interfaceNode.uri || "",
				signature: interfaceNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(interfaceNode.value.attributes.docs).summary
			};

			members.interfaces.members.push(attributes);
		},
		[ApiNodeType.TypeAliasNode]: (typeAliasNode) => {
			if (!members.typeAliases) {
				members.typeAliases = { members: [], name: "Types" };
			}

			const attributes: Member = {
				name: typeAliasNode.value.name,
				url: typeAliasNode.uri || "",
				signature: typeAliasNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(typeAliasNode.value.attributes.docs).summary
			};

			members.typeAliases.members.push(attributes);
		},
		[ApiNodeType.EnumNode]: (enumNode) => {
			if (!members.enums) {
				members.enums = { members: [], name: "Enums" };
			}

			const attributes: Member = {
				name: enumNode.value.name,
				url: enumNode.uri || "",
				signature: enumNode.value.attributes.signature,
				summary: buildMarkdownDocsContext(enumNode.value.attributes.docs).summary
			};

			members.enums.members.push(attributes);
		}
	});

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

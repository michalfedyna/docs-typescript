import { HandlebarsMarkdownContext } from "../Template";
import { buildMarkdownDocsContext } from "./MarkdownDocsContext";
import { PackageNode } from "../../documenter/api/PackageNode";
import { ApiNodeType } from "../../documenter/api/ApiNode";

interface Members {
	[key: string]: { name: string; members: { name: string; url: string }[] };
}

interface MarkdownPackageContext {
	name: string;
	members: Members;
}

function buildMarkdownPackageContext(packageNode: PackageNode): HandlebarsMarkdownContext<MarkdownPackageContext> {
	const { name } = packageNode.value.attributes;
	const members: Members = {};

	packageNode.forEach((node) => {
		switch (node.type) {
			case ApiNodeType.FunctionNode: {
				if (!members.functions) {
					members.functions = { members: [], name: "Functions" };
				}

				members.functions.members.push({ name: node.value.name, url: node.uri || "" });
				break;
			}
			case ApiNodeType.VariableNode: {
				if (!members.variables) {
					members.variables = { members: [], name: "Variables" };
				}

				members.variables.members.push({ name: node.value.name, url: node.uri || "" });
				break;
			}
		}
	});

	Object.entries(members).forEach(([key, value]) => {
		value.members.sort((a, b) => a.name.localeCompare(b.name));
	});

	return [
		{
			name,
			members
		},
		"package"
	];
}

export { MarkdownPackageContext, buildMarkdownPackageContext };

import { HandlebarsMarkdownContext } from "../Template";
import { buildMarkdownDocsContext, MarkdownDocsContext } from "./MarkdownDocsContext";
import { PackageAttributes, PackageNode } from "../../documenter/api/PackageNode";

interface MarkdownPackageContext {
	name: string;
}

function buildMarkdownPackageContext(packageNode: PackageNode): HandlebarsMarkdownContext<MarkdownPackageContext> {
	const { name } = packageNode.value.attributes;

	const docsContext = buildMarkdownDocsContext(packageNode.value.docs);

	return [
		{
			name
		},
		"package"
	];
}

export { MarkdownPackageContext, buildMarkdownPackageContext };

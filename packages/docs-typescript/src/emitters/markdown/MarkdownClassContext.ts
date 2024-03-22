import { ClassNode } from "../../documenter/api/class/ClassNode";
import { HandlebarsMarkdownContext } from "../Template";
import { MarkdownDocsContext, buildMarkdownDocsContext } from "./MarkdownDocsContext";

interface MarkdownClassContext {
	name: string;
	signature: string;
  docs: MarkdownDocsContext;
}

function buildMarkdownClassContext(classNode: ClassNode): HandlebarsMarkdownContext<MarkdownClassContext> {
	const { name, signature } = classNode.value.attributes;
  const docs = buildMarkdownDocsContext(classNode.value.docs);

	return [{ name, signature, docs }, "class"];
}

export { MarkdownClassContext, buildMarkdownClassContext };
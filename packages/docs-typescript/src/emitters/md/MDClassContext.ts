import { ClassNode } from "../../documenter/api/class/ClassNode";
import { HandlebarsMDContext } from "../Template";
import { MDConstructorContext, buildMDConstructorContext } from "./MDConstructorContext";
import { MDDocsContext, buildMDDocsContext } from "./MDDocsContext";
import { MDPropertyContext, buildMDPropertyContext } from "./MDPropertyContext";

interface MDClassContext {
	name: string;
	signature: string;
	constructors: MDConstructorContext[];
	properties: MDPropertyContext[];
	docs: MDDocsContext;
}

function buildMDClassContext(classNode: ClassNode): HandlebarsMDContext<MDClassContext> {
	const { name, signature } = classNode.value.attributes;
	const docs = buildMDDocsContext(classNode.value.attributes.docs);
	const constructors = classNode.value.attributes.constructors.map((constructor) =>
		buildMDConstructorContext(constructor)
	);
	const properties = classNode.value.attributes.properties.map((property) => buildMDPropertyContext(property));

	return [{ name, signature, constructors, properties, docs }, "class"];
}

export { MDClassContext, buildMDClassContext };

import {
	Abstract,
	Constructors,
	Docs,
	Exported,
	Extends,
	FileUrl,
	Implements,
	Methods,
	Name,
	Properties,
	ReleaseTag,
	Signature,
	TypeParameters
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiClass, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";
import { ConstructorAttributes, extractConstructorAttributes } from "./ConstructorNode";
import { PropertyAttributes, extractPropertyAttributes } from "./PropertyNode";
import { MethodAttributes, extractMethodAttributes } from "./MethodNode";
import { isConstructor, isMethod, isProperty } from "../../apiItemsMatchers";
import { DocsExtractor } from "../../DocsExtractor";

interface ClassAttributes
	extends Name,
		ReleaseTag,
		Signature,
		Abstract,
		Implements,
		Extends,
		TypeParameters,
		Exported,
		FileUrl,
		Docs,
		Constructors,
		Properties,
		Methods {}

class ClassNode extends ApiNode<ClassAttributes> {
	public type: ApiNodeType = ApiNodeType.ClassNode;
}

function extractClassAttributes(apiClass: ApiClass): ClassAttributes {
	const { displayName, isAbstract, fileUrlPath, isExported } = apiClass;
	const docs = DocsExtractor.extract(apiClass);
	const extendsType = apiClass.extendsType?.excerpt.text;
	const implementedTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);
	const typeParameters = apiClass.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiClass.releaseTag);

	let constructors: ConstructorAttributes[] = [];
	let properties: PropertyAttributes[] = [];
	let methods: MethodAttributes[] = [];

	for (const member of apiClass.members) {
		if (isConstructor(member)) {
			constructors.push(extractConstructorAttributes(member));
		} else if (isProperty(member)) {
			properties.push(extractPropertyAttributes(member));
		} else if (isMethod(member)) {
			methods.push(extractMethodAttributes(member));
		}
	}

	const abstractSignature = isAbstract ? "abstract " : "";
	const extendsTypeSignature = extendsType ? ` extends ${extendsType}` : "";
	const implementsTypesSignature = implementedTypes.length > 0 ? ` implements ${implementedTypes.join(" ")}` : "";
	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);
	const typeParametersSignature = typeParametersArray.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";
	const constructorSignature = constructors.map((constructor) => constructor.signature + ";").join("\n");
	const propertySignature = properties.map((property) => property.signature + ";").join("\n");
	const methodSignature = methods.map((method) => method.signature + ";").join("\n");

	const signature = `${abstractSignature}class ${displayName}${typeParametersSignature}${extendsTypeSignature}${implementsTypesSignature} {${constructorSignature}${propertySignature}${methodSignature}}`;

	return {
		constructors,
		properties,
		methods,
		docs,
		extendsType,
		fileUrlPath,
		implementedTypes,
		isAbstract,
		isExported,
		name: displayName,
		releaseTag,
		signature,
		typeParameters
	};
}

export { ClassNode, ClassAttributes, extractClassAttributes };

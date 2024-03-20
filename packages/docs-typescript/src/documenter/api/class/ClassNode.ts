import {
	Abstract,
	Exported,
	Extends,
	FileUrl,
	Implements,
	Name,
	ReleaseTag,
	Signature,
	TypeParameters
} from "../ApiAttributes";
import { ApiNode, ApiNodeType } from "../ApiNode";
import { ApiClass, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";

interface ClassAttributes
	extends Name,
		ReleaseTag,
		Signature,
		Abstract,
		Implements,
		Extends,
		TypeParameters,
		Exported,
		FileUrl {}

class ClassNode extends ApiNode<ClassAttributes> {
	public type: ApiNodeType = ApiNodeType.ClassNode;
}

function extractClassAttributes(apiClass: ApiClass): ClassAttributes {
	const { displayName, isAbstract, fileUrlPath, isExported } = apiClass;
	const extendsType = apiClass.extendsType?.excerpt.text;
	const implementedTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);
	const typeParameters = apiClass.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text
	}));
	const releaseTag = ApiReleaseTag.getTagName(apiClass.releaseTag);

	const abstractSignature = isAbstract ? "abstract " : "";
	const extendsTypeSignature = extendsType ? ` extends ${extendsType}` : "";
	const implementsTypesSignature = implementedTypes.length > 0 ? ` implements ${implementedTypes.join(" ")}` : "";
	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);
	const typeParametersSignature = typeParameters.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";

	const signature = `${abstractSignature}class ${displayName}${typeParametersSignature}${extendsTypeSignature}${implementsTypesSignature} {}`;

	return {
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

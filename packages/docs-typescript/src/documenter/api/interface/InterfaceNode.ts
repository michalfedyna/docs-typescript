import { DocsExtractor } from "../../DocsExtractor.js";
import {
	ConstructorSignatures,
	Docs,
	Exported,
	ExtendsArray,
	FileUrl,
	IndexSignatures,
	MethodSignatures,
	Name,
	PropertySignatures,
	ReleaseTag,
	Signature,
	TypeParameters
} from "../ApiAttributes.js";
import { ApiNode, ApiNodeType } from "../ApiNode.js";
import { ApiInterface, ReleaseTag as ApiReleaseTag } from "@microsoft/api-extractor-model";
import { IndexSignatureAttributes, extractIndexSignatureAttributes } from "./IndexSignatureNode.js";
import { ConstructorSignatureAttributes, extractConstructorSignatureAttributes } from "./ConstructorSignatureNode.js";
import { PropertySignatureAttributes, extractPropertySignatureAttributes } from "./PropertySignatureNode.js";
import { MethodSignatureAttributes, extractMethodSignatureAttributes } from "./MethodSignatureNode.js";
import {
	isConstructorSignature,
	isIndexSignature,
	isMethodSignature,
	isPropertySignature
} from "../../apiItemsMatchers.js";

interface InterfaceAttributes
	extends Name,
		Docs,
		ReleaseTag,
		Signature,
		FileUrl,
		ExtendsArray,
		TypeParameters,
		Exported,
		IndexSignatures,
		ConstructorSignatures,
		PropertySignatures,
		MethodSignatures {}

class InterfaceNode extends ApiNode<InterfaceAttributes> {
	public type: ApiNodeType = ApiNodeType.InterfaceNode;
}

function extractInterfaceAttributes(apiInterface: ApiInterface): InterfaceAttributes {
	const { displayName, fileUrlPath, isExported } = apiInterface;
	const docs = DocsExtractor.extract(apiInterface);
	const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
		name: typeParameter.name,
		isOptional: typeParameter.isOptional,
		constraint: typeParameter.constraintExcerpt.text,
		default: typeParameter.defaultTypeExcerpt.text,
		doc: DocsExtractor.traverse(apiInterface, typeParameter.tsdocTypeParamBlock)
	}));
	const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);
	const releaseTag = ApiReleaseTag.getTagName(apiInterface.releaseTag);

	const indexSignatures: IndexSignatureAttributes[] = [];
	const constructorSignatures: ConstructorSignatureAttributes[] = [];
	const propertySignatures: PropertySignatureAttributes[] = [];
	const methodSignatures: MethodSignatureAttributes[] = [];

	for (const member of apiInterface.members) {
		if (isIndexSignature(member)) {
			indexSignatures.push(extractIndexSignatureAttributes(member));
			continue;
		}

		if (isConstructorSignature(member)) {
			constructorSignatures.push(extractConstructorSignatureAttributes(member));
			continue;
		}

		if (isPropertySignature(member)) {
			propertySignatures.push(extractPropertySignatureAttributes(member));
			continue;
		}

		if (isMethodSignature(member)) {
			methodSignatures.push(extractMethodSignatureAttributes(member));
			continue;
		}
	}

	const extendsTypesSignature = extendsTypes.length > 0 ? ` extends ${extendsTypes.join(", ")}` : "";

	const typeParametersArray = typeParameters.map(
		(typeParameter) =>
			`${typeParameter.name}${typeParameter.constraint ? ` extends ${typeParameter.constraint}` : ""}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
	);

	const typeParametersSignature = typeParametersArray.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";

	const indexSignature = indexSignatures.map((index) => index.signature).join("\n");
	const constructorSignature = constructorSignatures.map((constructor) => constructor.signature).join("\n");
	const propertySignature = propertySignatures.map((property) => property.signature).join("\n");
	const methodSignature = methodSignatures.map((method) => method.signature).join("\n");

	const signature = `interface ${displayName}${typeParametersSignature}${extendsTypesSignature} {${indexSignature}${constructorSignature}${propertySignature}${methodSignature}}`;

	return {
		name: displayName,
		indexSignatures,
		constructorSignatures,
		propertySignatures,
		methodSignatures,
		fileUrlPath,
		extendsTypes,
		isExported,
		signature,
		releaseTag,
		typeParameters,
		docs
	};
}

export { InterfaceNode, InterfaceAttributes, extractInterfaceAttributes };

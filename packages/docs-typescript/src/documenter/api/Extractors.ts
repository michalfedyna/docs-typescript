import {
	ApiClass,
	ApiConstructor,
	ApiConstructSignature,
	ApiEnum,
	ApiEnumMember,
	ApiFunction,
	ApiIndexSignature,
	ApiInterface,
	ApiMethod,
	ApiMethodSignature,
	ApiNamespace,
	ApiPackage,
	ApiProperty,
	ApiPropertySignature,
	ApiTypeAlias,
	ApiVariable,
	ReleaseTag
} from "@microsoft/api-extractor-model";

import { PackageAttributes } from "./PackageNode";
import { NamespaceAttributes } from "./NamespaceNode";
import { ClassAttributes } from "./ClassNode";
import { ConstructorAttributes } from "./ConstructorNode";
import { PropertyAttributes } from "./PropertyNode";
import { MethodAttributes } from "./MethodNode";
import { InterfaceAttributes } from "./InterfaceNode";
import { ConstructorSignatureAttributes } from "./ConstructorSignatureNode";
import { PropertySignatureAttributes } from "./PropertySignatureNode";
import { MethodSignatureAttributes } from "./MethodSignatureNode";
import { IndexSignatureAttributes } from "./IndexSignatureNode";
import { TypeAliasAttributes } from "./TypeAliasNode";
import { VariableAttributes } from "./VariableNode";
import { FunctionAttributes } from "./FunctionNode";
import { EnumAttributes } from "./EnumNode";
import { EnumMemberAttributes } from "./EnumMemberNode";

namespace Extractors {
	export function apiPackage(apiPackage: ApiPackage): PackageAttributes {
		const { displayName } = apiPackage;

		return {
			name: displayName
		};
	}

	export function apiNamespace(apiNamespace: ApiNamespace): NamespaceAttributes {
		const { displayName, fileUrlPath, isExported } = apiNamespace;
		const releaseTag = ReleaseTag.getTagName(apiNamespace.releaseTag);
		// TODO: Create better signature
		const signature = `namespace ${displayName}{}`;

		return {
			name: displayName,
			releaseTag,
			signature,
			isExported,
			fileUrlPath
		};
	}

	export function apiClass(apiClass: ApiClass): ClassAttributes {
		const { displayName, isAbstract, fileUrlPath, isExported } = apiClass;
		const extendsType = apiClass.extendsType?.excerpt.text;
		const implementsTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);
		const typeParameters = apiClass.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const releaseTag = ReleaseTag.getTagName(apiClass.releaseTag);

		const abstractSignature = isAbstract ? "abstract " : "";
		const extendsTypeSignature = extendsType ? ` extends ${extendsType}` : "";
		const implementsTypesSignature = implementsTypes.length > 0 ? ` implements ${implementsTypes.join(" ")}` : "";
		const typeParametersArray = typeParameters.map(
			(typeParameter) => `${typeParameter.name}${typeParameter.default ? ` = ${typeParameter.default}` : ""}`
		);
		const typeParametersSignature = typeParameters.length > 0 ? `<${typeParametersArray.join(", ")}>` : "";

		const signature = `${abstractSignature}class ${displayName}${typeParametersSignature}${extendsTypeSignature}${implementsTypesSignature} {}`;

		return {
			extendsType,
			fileUrlPath,
			implementedTypes: implementsTypes,
			isAbstract,
			isExported,
			name: displayName,
			releaseTag,
			signature,
			typeParameters
		};
	}

	export function apiConstructor(apiConstructor: ApiConstructor): ConstructorAttributes {
		const { displayName, overloadIndex, isProtected, fileUrlPath } = apiConstructor;
		const parameters = apiConstructor.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const signature = apiConstructor.excerpt.text;
		const releaseTag = ReleaseTag.getTagName(apiConstructor.releaseTag);

		return {
			fileUrlPath,
			isProtected,
			name: displayName,
			overloadIndex,
			parameters,
			releaseTag,
			signature
		};
	}

	export function apiProperty(apiProperty: ApiProperty): PropertyAttributes {
		const { displayName, isStatic, isAbstract, isProtected, isReadonly, isOptional, isEventProperty, fileUrlPath } =
			apiProperty;
		const type = apiProperty.propertyTypeExcerpt.text;
		const initializer = apiProperty.initializerExcerpt?.text;
		const releaseTag = ReleaseTag.getTagName(apiProperty.releaseTag);
		const signature = apiProperty.excerpt.text;

		return {
			name: displayName,
			signature,
			releaseTag,
			initializer,
			fileUrlPath,
			isAbstract,
			isEventProperty,
			isOptional,
			isProtected,
			isReadonly,
			isStatic,
			type
		};
	}

	export function apiMethod(apiMethod: ApiMethod): MethodAttributes {
		const parameters = apiMethod.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiMethod.returnTypeExcerpt.text;
		const { displayName, isStatic, isAbstract, isProtected, isOptional, overloadIndex, fileUrlPath } = apiMethod;
		const releaseTag = ReleaseTag.getTagName(apiMethod.releaseTag);
		const signature = apiMethod.excerpt.text;

		return {
			name: displayName,
			releaseTag,
			signature,
			fileUrlPath,
			isAbstract,
			isOptional,
			isProtected,
			isStatic,
			overloadIndex,
			parameters,
			returnType
		};
	}

	export function apiInterface(apiInterface: ApiInterface): InterfaceAttributes {
		const { displayName, fileUrlPath, isExported } = apiInterface;
		const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);
		const releaseTag = ReleaseTag.getTagName(apiInterface.releaseTag);
		const signature = apiInterface.excerpt.text;

		return { name: displayName, fileUrlPath, extendsTypes, isExported, signature, releaseTag, typeParameters };
	}

	export function apiConstructorSignature(
		apiConstructSignature: ApiConstructSignature
	): ConstructorSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex } = apiConstructSignature;
		const signature = apiConstructSignature.excerpt.text;
		const returnType = apiConstructSignature.returnTypeExcerpt.text;
		const parameters = apiConstructSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const typeParameters = apiConstructSignature.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const releaseTag = ReleaseTag.getTagName(apiConstructSignature.releaseTag);

		return {
			name: displayName,
			releaseTag,
			signature,
			fileUrlPath,
			returnType,
			parameters,
			typeParameters,
			overloadIndex
		};
	}

	export function apiPropertySignature(apiPropertySignature: ApiPropertySignature): PropertySignatureAttributes {
		const { displayName, fileUrlPath, isReadonly, isOptional, isEventProperty } = apiPropertySignature;
		const type = apiPropertySignature.propertyTypeExcerpt.text;
		const releaseTag = ReleaseTag.getTagName(apiPropertySignature.releaseTag);
		const signature = apiPropertySignature.excerpt.text;

		return { name: displayName, releaseTag, signature, fileUrlPath, type, isOptional, isReadonly, isEventProperty };
	}

	export function apiMethodSignature(apiMethodSignature: ApiMethodSignature): MethodSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex, isOptional } = apiMethodSignature;
		const returnType = apiMethodSignature.returnTypeExcerpt.text;
		const parameters = apiMethodSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const typeParameters = apiMethodSignature.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const releaseTag = ReleaseTag.getTagName(apiMethodSignature.releaseTag);
		const signature = apiMethodSignature.excerpt.text;

		return {
			name: displayName,
			fileUrlPath,
			returnType,
			releaseTag,
			signature,
			parameters,
			typeParameters,
			overloadIndex,
			isOptional
		};
	}

	export function apiIndexSignature(apiIndexSignature: ApiIndexSignature): IndexSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex, isReadonly } = apiIndexSignature;
		const parameters = apiIndexSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiIndexSignature.returnTypeExcerpt.text;
		const releaseTag = ReleaseTag.getTagName(apiIndexSignature.releaseTag);
		const signature = apiIndexSignature.excerpt.text;

		return { name: displayName, fileUrlPath, parameters, returnType, overloadIndex, isReadonly, signature, releaseTag };
	}

	export function apiTypeAlias(apiTypeAlias: ApiTypeAlias): TypeAliasAttributes {
		const { displayName, fileUrlPath, isExported } = apiTypeAlias;
		const type = apiTypeAlias.typeExcerpt.text;
		const typeParameters = apiTypeAlias.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const releaseTag = ReleaseTag.getTagName(apiTypeAlias.releaseTag);
		const signature = apiTypeAlias.excerpt.text;

		return { name: displayName, fileUrlPath, isExported, releaseTag, signature, type, typeParameters };
	}

	export function apiVariable(apiVariable: ApiVariable): VariableAttributes {
		const { displayName, fileUrlPath, isExported, isReadonly } = apiVariable;
		const type = apiVariable.variableTypeExcerpt.text;
		const releaseTag = ReleaseTag.getTagName(apiVariable.releaseTag);
		const signature = apiVariable.excerpt.text;
		const initializer = apiVariable.initializerExcerpt?.text;

		return { name: displayName, fileUrlPath, releaseTag, signature, isExported, initializer, isReadonly, type };
	}

	export function apiFunction(apiFunction: ApiFunction): FunctionAttributes {
		const { displayName, fileUrlPath, overloadIndex, isExported } = apiFunction;
		const parameters = apiFunction.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiFunction.returnTypeExcerpt.text;
		const typeParameters = apiFunction.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const releaseTag = ReleaseTag.getTagName(apiFunction.releaseTag);
		const signature = apiFunction.excerpt.text;

		return {
			fileUrlPath,
			isExported,
			name: displayName,
			overloadIndex,
			parameters,
			releaseTag,
			returnType,
			signature,
			typeParameters
		};
	}

	export function apiEnum(apiEnum: ApiEnum): EnumAttributes {
		const { displayName, fileUrlPath, isExported } = apiEnum;
		const members = apiEnum.members.map((member) => ({
			name: member.name
		}));
		const releaseTag = ReleaseTag.getTagName(apiEnum.releaseTag);
		const signature = apiEnum.excerpt.text;

		return { name: displayName, releaseTag, isExported, signature, fileUrlPath, members };
	}

	export function apiEnumMember(apiEnumMember: ApiEnumMember): EnumMemberAttributes {
		const { displayName, fileUrlPath } = apiEnumMember;
		const signature = apiEnumMember.excerpt.text;
		const releaseTag = ReleaseTag.getTagName(apiEnumMember.releaseTag);

		return { name: displayName, fileUrlPath, signature, releaseTag };
	}
}

export { Extractors };

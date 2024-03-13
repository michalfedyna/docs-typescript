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
	ApiVariable
} from "@microsoft/api-extractor-model";
import { PackageAttributes } from "../hierarchy/items/PackageItem";
import { NamespaceAttributes } from "../hierarchy/items/NamespaceItem";
import { ClassAttributes } from "../hierarchy/items/ClassItem";
import { ConstructorAttributes } from "../hierarchy/items/ConstructorItem";
import { PropertyAttributes } from "../hierarchy/items/PropertyItem";
import { MethodAttributes } from "../hierarchy/items/MethodItem";
import { InterfaceAttributes } from "../hierarchy/items/InterfaceItem";
import { ConstructorSignatureAttributes } from "../hierarchy/items/ConstructorSignatureItem";
import { MethodSignatureAttributes } from "../hierarchy/items/MethodSignatureItem";
import { PropertySignatureAttributes } from "../hierarchy/items/PropertySignatureItem";
import { IndexSignatureAttributes } from "../hierarchy/items/IndexSignatureItem";
import { TypeAliasAttributes } from "../hierarchy/items/TypeAliasItem";
import { VariableAttributes } from "../hierarchy/items/VariableItem";
import { FunctionAttributes } from "../hierarchy/items/FunctionItem";
import { EnumAttributes } from "../hierarchy/items/EnumItem";
import { EnumMemberAttributes } from "../hierarchy/items/EnumMemberItem";

namespace AttributesExtractors {
	export function apiPackage(apiPackage: ApiPackage): PackageAttributes {
		const { displayName } = apiPackage;

		return {
			displayName
		};
	}

	export function apiNamespace(apiNamespace: ApiNamespace): NamespaceAttributes {
		const { displayName, fileUrlPath } = apiNamespace;

		return {
			fileUrlPath,
			displayName
		};
	}

	export function apiClass(apiClass: ApiClass): ClassAttributes {
		const { displayName, isAbstract, fileUrlPath } = apiClass;
		const extendsType = apiClass.extendsType?.excerpt.text;
		const implementsTypes = apiClass.implementsTypes.map((type) => type.excerpt.text);
		const signature = apiClass.excerpt.text;

		return {
			signature,
			displayName,
			isAbstract,
			fileUrlPath,
			extendsType,
			implementedTypes: implementsTypes
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

		return {
			signature,
			displayName,
			overloadIndex,
			isProtected,
			fileUrlPath,
			parameters
		};
	}

	export function apiProperty(apiProperty: ApiProperty): PropertyAttributes {
		const { displayName, isStatic, isAbstract, isProtected, isReadonly, isOptional, isEventProperty, fileUrlPath } =
			apiProperty;

		const type = apiProperty.propertyTypeExcerpt.text;

		return {
			displayName,
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

		return {
			displayName,
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
		const { displayName, fileUrlPath } = apiInterface;
		const typeParameters = apiInterface.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));
		const extendsTypes = apiInterface.extendsTypes.map((extendsType) => extendsType.excerpt.text);

		return { displayName, fileUrlPath, extendsTypes, typeParameters };
	}

	export function apiConstructorSignature(
		apiConstructSignature: ApiConstructSignature
	): ConstructorSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex } = apiConstructSignature;
		const returnType = apiConstructSignature.returnTypeExcerpt.text;
		const parameters = apiConstructSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));

		return { displayName, fileUrlPath, returnType, parameters, overloadIndex };
	}

	export function apiPropertySignature(apiPropertySignature: ApiPropertySignature): PropertySignatureAttributes {
		const { displayName, fileUrlPath, isReadonly, isOptional, isEventProperty } = apiPropertySignature;
		const type = apiPropertySignature.propertyTypeExcerpt.text;

		return { displayName, fileUrlPath, type, isOptional, isReadonly, isEventProperty };
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

		return { displayName, fileUrlPath, returnType, parameters, typeParameters, overloadIndex, isOptional };
	}

	export function apiIndexSignature(apiIndexSignature: ApiIndexSignature): IndexSignatureAttributes {
		const { displayName, fileUrlPath, overloadIndex, isReadonly } = apiIndexSignature;
		const parameters = apiIndexSignature.parameters.map((parameter) => ({
			name: parameter.name,
			type: parameter.parameterTypeExcerpt.text,
			isOptional: parameter.isOptional
		}));
		const returnType = apiIndexSignature.returnTypeExcerpt.text;

		return { displayName, fileUrlPath, parameters, returnType, overloadIndex, isReadonly };
	}

	export function apiTypeAlias(apiTypeAlias: ApiTypeAlias): TypeAliasAttributes {
		const { displayName, fileUrlPath } = apiTypeAlias;
		const type = apiTypeAlias.typeExcerpt.text;
		const typeParameters = apiTypeAlias.typeParameters.map((typeParameter) => ({
			name: typeParameter.name,
			isOptional: typeParameter.isOptional,
			constraint: typeParameter.constraintExcerpt.text,
			default: typeParameter.defaultTypeExcerpt.text
		}));

		return { displayName, fileUrlPath, type, typeParameters };
	}

	export function apiVariable(apiVariable: ApiVariable): VariableAttributes {
		const { displayName, fileUrlPath } = apiVariable;
		const type = apiVariable.variableTypeExcerpt.text;

		return { displayName, fileUrlPath, type };
	}

	export function apiFunction(apiFunction: ApiFunction): FunctionAttributes {
		const { displayName, fileUrlPath, overloadIndex } = apiFunction;
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

		return { displayName, fileUrlPath, parameters, typeParameters, returnType, overloadIndex };
	}

	export function apiEnum(apiEnum: ApiEnum): EnumAttributes {
		const { displayName, fileUrlPath } = apiEnum;
		const members = apiEnum.members.map((member) => ({
			name: member.name
		}));

		return { displayName, fileUrlPath, members };
	}

	export function apiEnumMember(apiEnumMember: ApiEnumMember): EnumMemberAttributes {
		const { displayName, fileUrlPath } = apiEnumMember;

		return { displayName, fileUrlPath };
	}
}

export { AttributesExtractors };

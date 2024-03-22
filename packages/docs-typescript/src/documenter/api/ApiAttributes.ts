import { RootDocNode } from "../docs/RootDocNode";

interface Name {
	name: string;
}

interface ReleaseTag {
	releaseTag: string;
}

interface Exported {
	isExported: boolean;
}

interface Signature {
	signature: string;
}

interface Implements {
	implementedTypes: string[];
}

interface Extends {
	extendsType?: string;
}

interface ExtendsArray {
	extendsTypes: string[];
}

interface Abstract {
	isAbstract: boolean;
}

interface Protected {
	isProtected: boolean;
}

interface Readonly {
	isReadonly: boolean;
}

interface Optional {
	isOptional: boolean;
}

interface Static {
	isStatic: boolean;
}

interface EventProperty {
	isEventProperty: boolean;
}

interface FileUrl {
	fileUrlPath?: string;
}

interface Parameter {
	name: string;
	type: string;
	isOptional: boolean;
	doc?: RootDocNode;
}

interface Parameters {
	parameters: Parameter[];
}

interface TypeParameter {
	name: string;
	isOptional: boolean;
	constraint: string;
	default: string;
	doc?: RootDocNode;
}

interface TypeParameters {
	typeParameters: TypeParameter[];
}

interface Type {
	type: string;
}

interface Initializer {
	initializer?: string;
}

interface Overload {
	overloadIndex: number;
}

interface Returns {
	returnType: string;
}

interface Member {
	name: string;
	doc?: RootDocNode;
}

interface Members {
	members: Member[];
}

export {
	Abstract,
	Exported,
	Extends,
	ExtendsArray,
	EventProperty,
	FileUrl,
	Implements,
	Initializer,
	Members,
	Name,
	Optional,
	Overload,
	Parameters,
	Protected,
	Readonly,
	ReleaseTag,
	Returns,
	Signature,
	Static,
	Type,
	TypeParameters
};

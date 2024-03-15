import { RootDocNode } from "./RootDocNode";

interface DocsAttributes {
	summary?: RootDocNode;
	remarks?: RootDocNode;
	returns?: RootDocNode;
	deprecated?: RootDocNode;
	defaultValue?: RootDocNode[];
	typeParams?: RootDocNode[];
	see?: RootDocNode[];
	params?: RootDocNode[];
	examples?: RootDocNode[];
	since?: RootDocNode[];
	infos?: RootDocNode[];
	warnings?: RootDocNode[];
	errors?: RootDocNode[];
	authors?: RootDocNode[];
}

export type { DocsAttributes };

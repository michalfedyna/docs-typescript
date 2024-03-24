interface PackageMember {
	name: string;
	url: string;
	signature?: string;
	summary?: string[];
}

interface MDPackageMembersContext {
	[key: string]: { name: string; members: PackageMember[] };
}

export { MDPackageMembersContext, PackageMember };

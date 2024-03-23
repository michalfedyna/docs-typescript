interface Member {
	name: string;
	url: string;
	signature?: string;
	summary?: string[];
}

interface MDMembersContext {
	[key: string]: { name: string; members: Member[] };
}

export { MDMembersContext, Member };

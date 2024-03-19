interface Member {
	name: string;
	url: string;
	signature?: string;
	summary?: string;
}

interface MarkdownMembersContext {
	[key: string]: { name: string; members: Member[] };
}

export { MarkdownMembersContext };

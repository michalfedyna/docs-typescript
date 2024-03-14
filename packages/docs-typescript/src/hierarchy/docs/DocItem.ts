enum DocItemType {
	DocItem = "DocItem",
	TextDocItem = "TextDocItem",
	ParagraphDocItem = "ParagraphDocItem"
}

class DocItem<T = {}> {
	public type: DocItemType = DocItemType.DocItem;
	public content: T;

	public children: DocItem[] = [];
	public parent?: DocItem;

	constructor(content: T, parent?: DocItem) {
		this.content = content;

		if (parent) this.parent = parent;
	}

	public addChild<K extends DocItem>(child: K): K {
		const index = this.children.push(child);
		return this.children[index - 1] as K;
	}
}

export { DocItem, DocItemType };

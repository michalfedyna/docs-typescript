enum DocNodeType {
	DocNode = "DocNode",
	RootDocNode = "RootDocNode",
	PlainTextDocNode = "PlainTextDocNode",
	ParagraphDocNode = "ParagraphDocNode",
	SoftBreakDocNode = "SoftBreakDocNode",
	LinkTagDocNode = "LinkTagDocNode",
	CodeSpanDocNode = "CodeSpanDocNode",
	FancedCodeDocNode = "FancedCodeDocNode"
}

interface DocNodeValue<T> {
	attributes: T;
}

class DocNode<T = unknown> {
	public type: DocNodeType = DocNodeType.DocNode;
	public value: DocNodeValue<T>;

	public children: DocNode[] = [];
	public parent?: DocNode;

	constructor(value: DocNodeValue<T>) {
		this.value = value;
	}

	public addChild<K extends DocNode>(child: K): K {
		const index = this.children.push(child);
		child.parent = this;
		return this.children[index - 1] as K;
	}

	public forEach(callback: (node: DocNode) => void): void {
		callback(this);
		for (const child of this.children) {
			child.forEach(callback);
		}
	}

	public toObject(): object {
		return {
			type: this.type,
			attributes: this.value.attributes,
			children: this.children.map((child) => child.toObject())
		};
	}
}

export { DocNode, DocNodeType, DocNodeValue };

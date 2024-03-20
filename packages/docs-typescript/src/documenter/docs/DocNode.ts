import { CodeSpanDocNode } from "./CodeSpanDocNode";
import { FancedCodeDocNode } from "./FancedCodeDocNode";
import { LinkTagDocNode } from "./LinkTagNode";
import { ParagraphDocNode } from "./ParagraphDocNode";
import { PlainTextDocNode } from "./PlainTextDocNode";
import { RootDocNode } from "./RootDocNode";
import { SoftBreakDocNode } from "./SoftBreakDocNode";

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

type CallbackArray = {
	[DocNodeType.RootDocNode]?: (node: RootDocNode) => void;
	[DocNodeType.PlainTextDocNode]?: (node: PlainTextDocNode) => void;
	[DocNodeType.ParagraphDocNode]?: (node: ParagraphDocNode) => void;
	[DocNodeType.SoftBreakDocNode]?: (node: SoftBreakDocNode) => void;
	[DocNodeType.LinkTagDocNode]?: (node: LinkTagDocNode) => void;
	[DocNodeType.CodeSpanDocNode]?: (node: CodeSpanDocNode) => void;
	[DocNodeType.FancedCodeDocNode]?: (node: FancedCodeDocNode) => void;
};

type DocNodeValue<T> = T;

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

	public forEach(callback: ((node: DocNode) => void) | CallbackArray): void {
		if (typeof callback === "function") {
			callback(this);
		} else {
			switch (this.type) {
				case DocNodeType.RootDocNode:
					callback[DocNodeType.RootDocNode]?.(this as RootDocNode);
					break;
				case DocNodeType.PlainTextDocNode:
					callback[DocNodeType.PlainTextDocNode]?.(this as PlainTextDocNode);
					break;
				case DocNodeType.ParagraphDocNode:
					callback[DocNodeType.ParagraphDocNode]?.(this as ParagraphDocNode);
					break;
				case DocNodeType.SoftBreakDocNode:
					callback[DocNodeType.SoftBreakDocNode]?.(this as SoftBreakDocNode);
					break;
				case DocNodeType.LinkTagDocNode:
					callback[DocNodeType.LinkTagDocNode]?.(this as LinkTagDocNode);
					break;
				case DocNodeType.CodeSpanDocNode:
					callback[DocNodeType.CodeSpanDocNode]?.(this as CodeSpanDocNode);
					break;
				case DocNodeType.FancedCodeDocNode:
					callback[DocNodeType.FancedCodeDocNode]?.(this as FancedCodeDocNode);
					break;
			}
		}
		for (const child of this.children) {
			child.forEach(callback);
		}
	}

	public toObject(): object {
		return {
			type: this.type,
			attributes: this.value,
			children: this.children.map((child) => child.toObject())
		};
	}
}

export { DocNode, DocNodeType, DocNodeValue, CallbackArray };

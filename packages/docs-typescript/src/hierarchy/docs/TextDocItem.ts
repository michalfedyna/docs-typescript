import { DocItem, DocItemType } from "./DocItem";

interface TextContent {
	text: string;
}

class TextDocItem extends DocItem<TextContent> {
	public type: DocItemType = DocItemType.TextDocItem;
}

export { TextDocItem, TextContent };

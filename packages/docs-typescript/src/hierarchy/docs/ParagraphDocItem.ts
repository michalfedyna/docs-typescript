import { DocItem, DocItemType } from "./DocItem";

interface ParagraphContent {}

class ParagraphDocItem extends DocItem<ParagraphContent> {
	public type: DocItemType = DocItemType.ParagraphDocItem;
}

export { ParagraphDocItem, ParagraphContent };

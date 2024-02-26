import { DocsItem } from "./DocsItem";

class DocsBuilder {
	public build(): DocsItem {
		return new DocsItem();
	}
}

export { DocsBuilder };

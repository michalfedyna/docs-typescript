enum DocType {
	Paragraph = "Paragraph",
	Content = "Content",
	Code = "Code",
	InlineCode = "InlineCode",
	Link = "Link"
}

type Doc =
	| {
			type: DocType.Content;
			content: string;
	  }
	| {
			type: DocType.Code;
			content: string[];
			language?: string;
	  }
	| {
			type: DocType.InlineCode;
			content: string;
	  }
	| {
			type: DocType.Link;
			content: string;
	  }
	| {
			type: DocType.Paragraph;
			writer: DocWriter;
	  };

class DocWriter {
	private _docs: Doc[] = [];

	public writeCode(line: string, language?: string) {
		return this._writeLine({ type: DocType.Code, language: language, content: this._writeLines(line) });
	}

	public writeInlineCode(content: string) {
		return this._writeLine({ type: DocType.InlineCode, content });
	}

	public writeContent(line: string) {
		return this._writeLine({ type: DocType.Content, content: line });
	}

	public writeParagraph(): DocWriter | undefined {
		const index = this._docs.push({ type: DocType.Paragraph, writer: new DocWriter() });
		const doc = this._docs[index - 1];
		if (doc.type === DocType.Paragraph) {
			return doc.writer;
		}
	}

	public writeLink(content: string) {
		return this._writeLine({ type: DocType.Link, content });
	}

	public get docs(): Doc[] {
		return this._docs;
	}

	private _writeLine(line: Doc) {
		this._docs.push(line);
		return this;
	}

	private _writeLines(line: string, separator: string = "\n"): string[] {
		return line.split(separator).map((line) => {
			return line;
		});
	}
}

export { DocWriter, DocType };
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
			content: DocWriter;
	  };

class DocWriter {
	public docs: Doc[] = [];

	public toString(): string {
		return this.docs
			.map((doc) => {
				switch (doc.type) {
					case DocType.Content:
						return doc.content;
					case DocType.Code:
						return "```" + (doc.language ? doc.language : "") + "\n" + doc.content.join("\n") + "\n```";
					case DocType.InlineCode:
						return "`" + doc.content + "`";
					case DocType.Link:
						return "[" + doc.content + "]";
					case DocType.Paragraph:
						return "\n" + doc.content.toString() + "\n";
				}
			})
			.join("");
	}

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
		const index = this.docs.push({ type: DocType.Paragraph, content: new DocWriter() });
		const doc = this.docs[index - 1];
		if (doc.type === DocType.Paragraph) {
			return doc.content;
		}
	}

	public writeLink(content: string) {
		return this._writeLine({ type: DocType.Link, content });
	}

	private _writeLine(line: Doc) {
		this.docs.push(line);
		return this;
	}

	private _writeLines(line: string, separator: string = "\n"): string[] {
		return line.split(separator).map((line) => {
			return line;
		});
	}
}

export { DocWriter, DocType };

enum LineType {
	NewLine = "NewLine",
	Content = "Content",
	Code = "Code",
	InlineCode = "InlineCode"
}

type Line =
	| {
			type: LineType.Content;
			content: string;
	  }
	| {
			type: LineType.Code;
			content: string[];
			language?: string;
	  }
	| {
			type: LineType.InlineCode;
			content: string;
	  }
	| {
			type: LineType.NewLine;
	  };

class LineWriter {
	private _lines: Line[] = [];

	public writeCode(line: string, language?: string) {
		return this._writeLine({ type: LineType.Code, content: this._writeLines(line) });
	}

	public writeInlineCode(content: string) {
		return this._writeLine({ type: LineType.InlineCode, content });
	}

	public writeContent(line: string) {
		return this._writeLine({ type: LineType.Content, content: line });
	}

	public writeNewLine() {
		this._lines.push({ type: LineType.NewLine });
		return this;
	}

	public get lines(): Line[] {
		return this._lines;
	}

	private _writeLine(line: Line) {
		this._lines.push(line);
		return this;
	}

	private _writeLines(line: string, separator: string = "\n"): string[] {
		return line.split(separator).map((line) => {
			return line;
		});
	}
}

export { LineWriter };

class LineWriter {
	private _lines: string[] = [];

	writeLine(line: string) {
		this._lines.push(line);
		return this;
	}

	writeLines(line: string, separator: string = "\n") {
		line.split(separator).forEach((line) => {
			if (line) this._lines.push(line);
		});
		return this;
	}

	writeBlankLine() {
		this._lines.push("");
		return this;
	}

	get lines(): string[] {
		return this._lines;
	}
}

export { LineWriter };

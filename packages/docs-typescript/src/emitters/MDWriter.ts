class MDWriter {
	protected _buffer: string[] = [];

	public paragraph(content?: string): void {
		if (!content) return;

		this.newline();
		this._buffer.push(content);
		this.newline();
	}

	public header(level: number, text: string): void {
		this._buffer.push(`${"#".repeat(level)} ${text}`);
	}

	public code(language: string, content: string): void {
		this._buffer.push("```" + language);
		this.newline();
		this._buffer.push(content);
		this.newline();
		this._buffer.push("```");
	}

	public inlineCode(content: string): void {
		this._buffer.push("`" + content + "`");
	}

	public link(content: string, url: string): void {
		this._buffer.push(`[${content}](${url})`);
	}

	public newline(): void {
		this._buffer.push("\n");
	}

	public toString(): string {
		return this._buffer.join("");
	}
}

export { MDWriter };

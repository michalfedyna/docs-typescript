class Debug {
	static enabled = false;

	private constructor() {}

	static log(...messages: any[]) {
		if (Debug.enabled) console.log(...messages);
	}

	static error(...messages: any[]) {
		if (Debug.enabled) console.error(...messages);
	}

	static enable() {
		Debug.enabled = true;
	}
}

export { Debug };

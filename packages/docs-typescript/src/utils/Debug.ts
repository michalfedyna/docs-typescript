import chalk from "chalk";

class Debug {
	static enabled = false;

	private constructor() {}

	static log(...messages: any[]) {
		if (Debug.enabled) console.log(chalk.yellow(...messages));
	}

	static error(...messages: any[]) {
		if (Debug.enabled) console.error(chalk.red(...messages));
	}

	static divider() {
		if (Debug.enabled) console.log("----------");
	}

	static enable() {
		Debug.enabled = true;
	}
}

export { Debug };

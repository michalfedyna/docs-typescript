import chalk from "chalk";

class Info {
	private constructor() {}

	static log(...messages: any[]) {
		console.log(chalk.blue(...messages));
	}

	static success(...messages: any[]) {
		console.log(chalk.green(...messages));
	}

	static error(...messages: any[]) {
		console.error(chalk.red(...messages));
	}
}

export { Info };

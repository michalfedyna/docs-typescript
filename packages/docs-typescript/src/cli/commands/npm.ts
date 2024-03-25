import { Command } from "commander";
import { Debug } from "../../utils/Debug.js";

function npm(cli: Command) {
	cli.command("npm").description("build documentation from npm package").action(action(cli));
}

function action(cli: Command) {
	return () => {
		const options = cli.opts();

		if (options.verbose) {
			Debug.enable();
		}
	};
}

export default npm;

import { Command } from "commander";
import { extractApiModel } from "../actions/extractApiModel.js";
import { Debug } from "../../utils/Debug.js";

function extract(cli: Command) {
	cli.command("extract").description("extract d.ts declarations and api model").action(action(cli));
}

function action(cli: Command) {
	return function () {
		const options = cli.opts();

		if (options.verbose) {
			Debug.enable();
		}

		extractApiModel();
	};
}

export default extract;

import { Command } from "commander";

import { getConfig } from "../actions/getConfig.js";
import { buildDocs } from "../actions/buildDocs.js";

import { Debug } from "../../utils/Debug.js";

function build(cli: Command) {
	cli.command("build").description("builds documentation").action(action(cli));
}

function action(cli: Command) {
	return function () {
		const options = cli.opts();

		if (options.verbose) {
			Debug.enable();
		}

		const config = getConfig();
		buildDocs(config);
	};
}

export default build;

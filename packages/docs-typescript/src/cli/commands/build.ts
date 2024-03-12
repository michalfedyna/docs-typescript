import { Command } from "commander";

import { getConfig } from "../../actions/getConfig";
import { buildDocs } from "../../actions/buildDocs";

import { Debug } from "../../utils/Debug";

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

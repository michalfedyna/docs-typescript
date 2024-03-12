import { Command } from "commander";
import { extractApiModel } from "../../actions/extractApiModel";
import { generateDeclarations } from "../../actions/generateDeclarations";
import { Debug } from "../../utils/Debug";

function extract(cli: Command) {
	cli.command("extract").description("extract d.ts declarations and api model").action(action(cli));
}

function action(cli: Command) {
	return function () {
		const options = cli.opts();

		if (options.verbose) {
			Debug.enable();
		}

		generateDeclarations();
		extractApiModel();
	};
}

export default extract;

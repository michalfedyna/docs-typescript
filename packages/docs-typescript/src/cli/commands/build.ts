import { Command } from "commander";

import { getConfig } from "../../actions/getConfig";
import { generateDeclarations } from "../../actions/generateDeclarations";
import { extractApiModel } from "../../actions/extractApiModel";
import { buildDocs } from "../../actions/buildDocs";

import { Debug } from "../../utils/Debug";

function build(cli: Command) {
	cli.command("build").description("generates documentation for entire project").action(action);
}

function action() {
	Debug.enable();
	Debug.log("build action started");

	Debug.log("Getting config");
	const config = getConfig();

	Debug.log("Generating declarations");
	generateDeclarations();

	Debug.log("Extracting API model");
	extractApiModel();

	Debug.log("Building documentation");
	buildDocs(config);
}

export default build;

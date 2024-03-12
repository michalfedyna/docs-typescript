import { Command } from "commander";

import init from "./commands/init";
import build from "./commands/build";
import extract from "./commands/extract";

const cli = new Command();

cli
	.name("docs-typescript")
	.description("CLI tool for generating documentation for TypeScript based projects")
	.version("0.0.1")
	.option("-v, --verbose", "enable verbose mode");

/** Register init command */
init(cli);

/** Register build command */
build(cli);

/** Register extract command */
extract(cli);

/** `docs-typescript` cli tool */
export default () => cli.parse(process.argv);

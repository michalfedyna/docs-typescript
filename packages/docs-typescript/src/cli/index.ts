import { Command } from "commander";

import init from "./commands/init.js";
import build from "./commands/build.js";
import extract from "./commands/extract.js";
import npm from "./commands/npm.js";

const cli = new Command();

cli
	.name("docs-typescript")
	.description("CLI tool for generating documentation for TypeScript based projects")
	.version("0.0.1")
	.option("-v, --verbose", "enable verbose mode");

init(cli);

build(cli);

extract(cli);

npm(cli);

export default () => cli.parse(process.argv);

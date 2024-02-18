import { Command } from "commander";
import init from "./commands/init";
import build from "./commands/build";
import extract from "./commands/extract";

const cli = new Command();

cli
  .name("docs-typescript")
  .description("Generates documentation for typescript project")
  .version("0.0.1");

/** Register init command */
init(cli);

/** Register extract command */
extract(cli);

/** Register build command */
build(cli);

/** `docs-typescript` cli tool */
export default () => cli.parse();

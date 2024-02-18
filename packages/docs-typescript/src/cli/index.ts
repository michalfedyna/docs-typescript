import { Command } from "commander";
import build from "./commands/build";

const cli = new Command();

cli
  .name("docs-typescript")
  .description("Generates documentation for typescript project")
  .version("0.0.1");

build(cli);

export default () => cli.parse();

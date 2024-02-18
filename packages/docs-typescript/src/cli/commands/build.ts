import { Command } from "commander";

function build(cli: Command) {
  cli
    .command("build")
    .description("generates documentation for entire project")
    .action(action);
}

function action() {
  console.log("build");
}

export default build;

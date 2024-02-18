## Actions

Actions orchestrates documentation building process.

## Nodes

Extends TSDoc DocNode classes to provide custom Abstract Syntax Tree nodes.

## Documenter

Builds TSDoc output from API Model representation.

## Emitters

Converts TSDoc Abstract Syntax Tree into various output formats.

## Cli

Command-line interface for the `docs-react` library.

## Docs Build Steps

- Custom TSDoc tags supporting React components. `@component`, `@props`, `@hook`, `@snack`, `playgroud`
- Extend TSDoc nodes to provide custom AST nodes.
- Modifiable navigation tree. `NavigationTree` class.
- Different output formats. `Emmitter` base class.

1. Build declaration files using typescript compiler.
2. Generate API model using `@microsoft/api-extractor`.
3. Load `@microsoft/api-extractor-model` API Model.
4. Generate navigation tree.
5. Generate TSDoc output.
6. Emit output to various formats.

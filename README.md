# Docs TypeScript - Documenting TypeScript made easy

[![npm version](https://badge.fury.io/js/docs-typescript.svg)](https://badge.fury.io/js/docs-typescript)

Tool for documenting TypeScript APIs using [API Extractor](https://api-extractor.com/pages/overview/intro/) Model with support for Markdown, [Docusaurus](https://docusaurus.io) (WIP) and HTML (WIP).
Alternative to [api-documenter](https://api-extractor.com/pages/setup/generating_docs/) and [TypeDoc](https://typedoc.org) with better UX, much richer API presentation and support for single and multi page documentation.

## Getting Started

### Create configuration

- Creates `docs.config.json`, `api-extractor.json` and `tsdoc.json` files with [default values](https://github.com/michalfedyna/docs-typescript/tree/main/packages/docs-typescript/src/templates/config)

```bash
npx docs-typescript init
```

### Extract API Model from declaration files

- Defaults to `types/index.d.ts` file

```bash
npx docs-typescript extract
```

### Build documentation form API Model

- Defaults to `api.json` file, creates `docs` folder with documentation

```bash
npx docs-typescript build
```

## Documentation

For all the details see **[DocsTypeScript.com](docstypescript.com)**, for API documentation see **[DocsTypeScript.com/api](docstypescript.com/api)** (Work in Progress)

- [api-extractor](https://api-extractor.com)
- [tsdoc](https://tsdoc.org)

## Examples

- [**Markdown on Github | Multi Page**]()
- [**Markdown on Github | Single Page**]()
- [**Markdown with Docusaurus**]()

## Supported [TSDoc](https://tsdoc.org) tags

- `@link`
- `@remarks`
- `@example`
- `@type`
- `@typeParam`
- `@returns`
- `@info`
- `@alert`
- `@error`
- `@author`
- `@since`
- `@public`
- `@beta`
- `@alpha`
- `@internal`
- `@deprecated`

For more informations visit [Doc comment syntax](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/)

## Roadmap

- [ ] Markdown support
- [ ] Single page / Multi page
- [ ] Project website
- [ ] Support for `@link` tag
- [ ] React support (categories for components/hooks/providers)
- [ ] [Mermaid support](https://mermaid.js.org) to present inheritance and dependencies
- [ ] Create and use api-extractor alternative in form of [extractor-typescript](https://github.com/michalfedyna/extractor-typescript)
- [ ] Docusaurus (MDX) output support
- [ ] HTML output support

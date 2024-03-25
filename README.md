# Docs Typescript - Documenting Typescript made easy

Tool for documenting Typescript APIs using [API Extractor](https://api-extractor.com/pages/overview/intro/) Model with support for Markdown, [Docusaurus](https://docusaurus.io) (WIP) and HTML (WIP).
Alternative to [api-documenter](https://api-extractor.com/pages/setup/generating_docs/) and [TypeDoc](https://typedoc.org) with better UX, much richer API presentation and support for single and multi page documentation.

## Getting Started

### Create configuration - creates `docs.config.json`, `api-extractor.json` and `tsdoc.json` files with default values

```bash
npx docs-typescript init
```

### Extract API Model from declaration files - defaults to `types/index.d.ts` file 

```bash
npx docs-typescript extract
```

### Build documentation form API Model - defaults to `api.json` file, creates `docs` folder with documentation

```bash
npx docs-typescript build
```

## Documentation

For all the details see **[DocsTypescript.com](docstypescript.com)**, for API documentation see **[DocsTypescript.com/api](docstypescript.com/api)** (Work in Progress)

- [api-extractor](https://api-extractor.com)
- [tsdoc](https://tsdoc.org)

## Examples

- [**Markdown on Github | Multi Page**]()
- [**Markdown on Github | Single Page**]()
- [**Markdown with Docusaurus**]()

## Supported [TSDoc](https://tsdoc.org) tags

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
- [ ] Suport for `@link` tag
- [ ] React support (categories for components/hooks/providers)
- [ ] [Mermaid support](https://mermaid.js.org) to present inheritance and dependencies
- [ ] Create and use api-extractor alternative in form of [extractor-typescript](https://github.com/michalfedyna/extractor-typescript)
- [ ] Docusaurus (MDX) output support
- [ ] HTML output support

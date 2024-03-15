import Handlebars from "handlebars";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface DocsContext extends DocsAttributes {}

const DocsTemplate = Handlebars.compile<DocsContext>(`
{{#if summary}}
## Summary
{{summary.content}}
{{/if}}
{{#if remarks}}
## Remarks
{{remarks.content}}
{{/if}}
`);

export { DocsContext, DocsTemplate };

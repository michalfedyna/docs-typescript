import Handlebars from "handlebars";
import { ConstructorContext } from "./constructor";
import { DocsAttributes } from "../../hierarchy/docs/DocsItemAttributes";
import { ClassAttributes } from "../../documenter/api/ClassNode";

interface ClassContext {
	attributes: ClassAttributes;
	docs: DocsAttributes;
	constructors: ConstructorContext[];
}

const ClassTemplate = Handlebars.compile<ClassContext>(`
{{#if attributes.isAbstract}}
# \`Abstract\` {{attributes.name}}
{{else}}
# {{attributes.name}}
{{/if}}

{{> docs docs }}

\`\`\`typescript
{{attributes.signature}}
\`\`\`

{{#each constructors}}
{{> constructor this }}
{{/each}}
`);

export { ClassContext, ClassTemplate };

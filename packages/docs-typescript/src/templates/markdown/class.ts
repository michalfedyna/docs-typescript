import Handlebars from "handlebars";
import { ConstructorContext } from "./constructor";
import { ClassAttributes } from "../../hierarchy/items/ClassItem";
import { DocsAttributes } from "../../hierarchy/docs/DocsItemAttributes";

interface ClassContext {
	attributes: ClassAttributes;
	docs: DocsAttributes;
	constructors: ConstructorContext[];
}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasddddddddsesxdddddddddcexdscccccxz                     nmmmmmmmmmn n








''

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

import Handlebars from "handlebars";
import { ConstructorContext } from "./constructor";

interface ClassContext {
	name: string;
	signature: string;
	isAbstract: boolean;
	constructors: ConstructorContext[];
}

const ClassTemplate = Handlebars.compile<ClassContext>(`
{{#if isAbstract}}
# \`Abstract\` {{name}}
{{else}}
# {{name}}
{{/if}}

\`\`\`typescript
{{signature}}
\`\`\`

{{#each constructors}}
{{> constructor this }}
{{/each}}
`);

export { ClassContext, ClassTemplate };

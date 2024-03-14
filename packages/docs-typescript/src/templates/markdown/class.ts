import Handlebars from "handlebars";
import { ConstructorContext } from "./constructor";

interface ClassContext {
	name: string;
	signature: string;
	isAbstract: boolean;
	constructorContext: ConstructorContext;
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

{{> constructor constructorContext}}
`);

export { ClassContext, ClassTemplate };

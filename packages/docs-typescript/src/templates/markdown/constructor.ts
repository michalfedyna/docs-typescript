import Handlebars from "handlebars";

interface ConstructorContext {
	name: string;
	signature: string;
}

const ConstructorTemplate = Handlebars.compile<ConstructorContext>(`
# {{name}}

\`\`\`typescript
{{signature}}
\`\`\`
`);

export { ConstructorContext, ConstructorTemplate };

import Handlebars from "handlebars";
import { DocsAttributes } from "../../hierarchy/docs/DocsItemAttributes";
import { ConstructorAttributes } from "../../documenter/api/ConstructorNode";

interface ConstructorContext {
	attributes: ConstructorAttributes;
	docs: DocsAttributes;
}

const ConstructorTemplate = Handlebars.compile<ConstructorContext>(`
# {{attributes.name}}

\`\`\`typescript
{{attributes.signature}}
\`\`\`
`);

export { ConstructorContext, ConstructorTemplate };

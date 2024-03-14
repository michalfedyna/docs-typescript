import Handlebars from "handlebars";
import { ConstructorAttributes } from "../../hierarchy/items/ConstructorItem";
import { DocsAttributes } from "../../hierarchy/docs/DocsItemAttributes";

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

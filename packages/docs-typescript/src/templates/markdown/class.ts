import Handlebars from "handlebars";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { ClassAttributes } from "../../documenter/api/class/ClassNode";

interface ClassContext {
	attributes: ClassAttributes;
	docs: DocsAttributes;
}

const ClassTemplate = Handlebars.compile<ClassContext>(
	`{{#if attributes.isAbstract}}
# \`Abstract\` {{attributes.name}}
{{else}}
# {{attributes.name}}
{{/if}}
{{> docs docs }}
\`\`\`typescript
{{{attributes.signature}}}
\`\`\``
);

export { ClassContext, ClassTemplate };

import { DocsAttributes } from "../../documenter/docs/DocsAttributes";
import { VariableAttributes } from "../../documenter/api/VariableNode";

interface VariableContext {
	attributes: VariableAttributes;
	docs: DocsAttributes;
}

const VariableTemplatePath = "markdown/handlebars/variable.hbs";

export { VariableContext, VariableTemplatePath };

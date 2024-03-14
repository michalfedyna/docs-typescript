interface DocsContext {}

const DocsTemplate = Handlebars.compile<DocsContext>(``);

export { DocsContext, DocsTemplate };

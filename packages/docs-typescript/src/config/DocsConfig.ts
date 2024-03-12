interface Config {
	api: string;
	root?: string;
	format?: "markdown" | "mdx" | "html";
	output?: string;
	singlePage?: boolean;
	framework?: "react" | false;
}

class DocsConfig implements Config {
	root: string;
	api: string;
	format: "markdown" | "mdx" | "html";
	output: string = "docs";
	singlePage: boolean;
	framework: "react" | false;

	constructor({ api, root = ".", format = "markdown", output = "docs", singlePage = true, framework = false }: Config) {
		this.root = root;
		this.api = api;
		this.format = format;
		this.output = output;
		this.singlePage = singlePage;
		this.framework = framework;
	}
}

export { DocsConfig };

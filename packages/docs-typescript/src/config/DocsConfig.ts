interface Config {
	apiJsonPath: string;
	rootPath?: string;
	outputFormat?: "markdown" | "mdx" | "html";
	outputPath?: string;
	singlePage?: boolean;
	framework?: "react" | false;
}

class DocsConfig implements Config {
	apiJsonPath: string;
	rootPath: string;
	outputFormat: "markdown" | "mdx" | "html";
	outputPath: string = "docs";
	singlePage: boolean;
	framework: "react" | false;

	constructor({
		apiJsonPath,
		rootPath = ".",
		outputFormat = "markdown",
		outputPath = "/docs",
		singlePage = false,
		framework = false
	}: Config) {
		this.apiJsonPath = apiJsonPath;
		this.rootPath = rootPath;
		this.outputFormat = outputFormat;
		this.outputPath = outputPath;
		this.singlePage = singlePage;
		this.framework = framework;
	}
}

export { DocsConfig, Config };

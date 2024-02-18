interface Config {
  mode: "md" | "mdx";
}

class DocsConfig {
  mode: "md" | "mdx";

  constructor({ mode }: Config) {
    this.mode = mode;
  }
}

export { DocsConfig };

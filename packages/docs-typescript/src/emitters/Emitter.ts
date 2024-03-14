import { DocsConfig } from "../config/DocsConfig";
import { RootNode } from "../documenter/api/RootNode";
import { TreeNode } from "../documenter/tree/TreeNode";

abstract class Emitter {
	constructor(protected readonly _config: DocsConfig) {}

	abstract emit(item: RootNode): void;

	protected abstract _emitPage(item: TreeNode): void;

	protected abstract _toFile(content: string, url: string): void;
}

export { Emitter };

import { DocsConfig } from "../config/DocsConfig.js";
import { RootNode } from "../documenter/api/RootNode.js";
import { ApiNode } from "../documenter/api/ApiNode.js";

abstract class Emitter {
	constructor(public readonly config: DocsConfig) {}

	abstract emit(item: RootNode): void;

	protected abstract _emitPage(item: ApiNode): void;

	protected abstract _toFile(content: string, url: string): void;
}

export { Emitter };

import { DocsConfig } from "../config/DocsConfig";
import { RootNode } from "../documenter/api/RootNode";
import { ApiNode } from "../documenter/api/ApiNode";

abstract class Emitter {
	constructor(public readonly config: DocsConfig) {}

	abstract emit(item: RootNode): void;

	protected abstract _emitPage(item: ApiNode): void;

	protected abstract _toFile(content: string, url: string): void;
}

export { Emitter };

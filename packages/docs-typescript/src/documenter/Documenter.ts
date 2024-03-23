import { ApiModel } from "@microsoft/api-extractor-model";
import { DocsConfig } from "../config/DocsConfig";

import { Emitter } from "../emitters/Emitter";
import { MDEmitter } from "../emitters/markdown/MDEmitter";

import { RootNode } from "./api/RootNode";
import { ApiExtractor } from "./ApiExtractor";

import { Debug } from "../utils/Debug";

class Documenter {
	public readonly apiModel: ApiModel;
	public readonly apiTree: RootNode;
	public readonly config: DocsConfig;
	public readonly emitter: Emitter;

	constructor(apiModel: ApiModel, config: DocsConfig) {
		this.apiModel = apiModel;
		this.config = config;
		this.apiTree = new RootNode();

		switch (config.outputFormat) {
			default:
				this.emitter = new MDEmitter(config);
		}
	}

	public emit(): void {
		ApiExtractor.traverse(this.apiModel, this.apiTree);
		this.emitter.emit(this.apiTree);
	}

	public debug(): void {
		Debug.log(JSON.stringify(this.apiTree.toObject(), null, 2));
	}
}

export { Documenter };

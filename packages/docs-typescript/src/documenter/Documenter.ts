import { ApiModel } from "@microsoft/api-extractor-model";
import { DocsConfig } from "../config/DocsConfig";

import { Emitter } from "../emitters/Emitter";
import { MDEmitter } from "../emitters/markdown/MDEmitter";
import { HTMLEmitter } from "../emitters/html/HTMLEmitter";
import { MDXEmitter } from "../emitters/mdx/MDXEmitter";

import { RootNode } from "./api/RootNode";
import { ApiExtractor } from "./ApiExtractor";

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
			// case "html":
			// 	this._emitter = new HTMLEmitter(config);
			// 	break;
			//
			// case "markdown":
			// 	this._emitter = new MDEmitter(config);
			// 	break;
			//
			// case "mdx":
			// 	this._emitter = new MDXEmitter(config);
			// 	break;
			default:
				this.emitter = new MDEmitter(config);
		}
	}

	public emit(): void {
		// console.log(JSON.stringify(this.apiTree.toObject(), null, 2));
		ApiExtractor.traverse(this.apiModel, this.apiTree);
		this.emitter.emit(this.apiTree);
	}
}

export { Documenter };

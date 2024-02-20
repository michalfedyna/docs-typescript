import { NavigationNode } from "./NavigationNode";
import { PageBuilder } from "./PageBuilder";
import { Node } from "./Node";
import { Emitter } from "../emitters/Emitter";

class NavigationTree extends Node {
  constructor() {
    super("");
  }

  public addPage(id: string, path: string): PageBuilder {
    const page = new PageBuilder();
    this.addNode(id, path, page);
    return page;
  }

  public build(emitter: Emitter): string {
    return "";
  }
}

export { NavigationTree };

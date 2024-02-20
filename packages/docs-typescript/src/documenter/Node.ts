import { PageBuilder } from "./PageBuilder";

class Node {
  private readonly _id: string;
  private _parent: Node | undefined;
  private _nodes: Node[] = [];
  private _page?: PageBuilder;

  constructor(id: string) {
    this._id = id;
  }

  public getId(): string {
    return this._id;
  }

  public addNode(id: string, path: string, page?: PageBuilder): void {
    const node = new Node(id);
    node.setParent(this);
    if (page) {
      node.setPage(page);
    }
    this._nodes.push(node);
  }

  public findNodeById(id: string): Node | undefined {
    if (this._id === id) {
      return this;
    }
    for (const node of this._nodes) {
      const foundNode: Node | undefined = node.findNodeById(id);
      if (foundNode) {
        return foundNode;
      }
    }
    return undefined;
  }

  public findNodeByPath(path: string): Node | undefined {
    return undefined;
  }

  public setParent(parent: Node): void {
    this._parent = parent;
  }

  public setPage(page: PageBuilder): void {
    this._page = page;
  }

  public getPage(): PageBuilder | undefined {
    return this._page;
  }
}

export { Node };

// const navigationTree = new NavigationTree();
// const page = navigationTree.addPage("test", "/test");
// page.addHeader("Test");
// page.addParagraph("This is a test.");
// const page2 = navigationTree.addPage("test2", "/test2");
// page2.addHeader("Test2");
// navigationTree.build();

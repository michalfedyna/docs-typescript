class TreeNode<T = unknown> {
	public type: string = "Node";
	public value: T;

	public children: TreeNode[] = [];
	public parent?: TreeNode;

	constructor(value: T, parent?: TreeNode) {
		this.value = value;

		if (parent) this.parent = parent;
	}

	public addChild<K extends TreeNode>(child: K, parent?: TreeNode): K {
		if (parent) return parent.addChild(child);

		const index = this.children.push(child);
		return this.children[index - 1] as K;
	}

	public toObject(): object {
		return {
			content: this.value,
			children: this.children.map((child) => child.toObject())
		};
	}
}

export { TreeNode };

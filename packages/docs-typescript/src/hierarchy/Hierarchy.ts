import { HierarchyItem, HierarchyItemType } from "./HierarchyItem";
import { NamespaceItem } from "./items/NamespaceItem";
import { JSXItem } from "./items/JSXItem";
import { HookItem } from "./items/HookItem";
import { PackageItem } from "./items/PackageItem";
import { ClassItem } from "./items/ClassItem";
import { ConstructorItem } from "./items/ConstructorItem";
import { PropertyItem } from "./items/PropertyItem";
import { MethodItem } from "./items/MethodItem";
import { PropsItem } from "./items/PropsItem";

class Hierarchy extends HierarchyItem {
	public addPackage(name: string, parent?: HierarchyItem): PackageItem {
		if (!parent) return this.addChild(new PackageItem(name, parent));
		return parent.addChild(new PackageItem(name, parent));
	}

	public addNamespace(name: string, parent?: HierarchyItem): NamespaceItem {
		if (!parent) return this.addChild(new NamespaceItem(name, parent));
		return parent.addChild(new NamespaceItem(name, parent));
	}

	public addJSX(name: string, parent?: HierarchyItem): JSXItem {
		if (!parent) return this.addChild(new JSXItem(name, parent));
		return parent.addChild(new JSXItem(name, parent));
	}

	public addHook(name: string, parent?: HierarchyItem): HookItem {
		if (!parent) return this.addChild(new HookItem(name, parent));
		return parent.addChild(new HookItem(name, parent));
	}

	public addProps(name: string, parent?: HierarchyItem): PropsItem {
		if (!parent) return this.addChild(new PropsItem(name, parent));
		return parent.addChild(new PropsItem(name, parent));
	}

	public addClass(name: string, parent?: HierarchyItem): ClassItem {
		if (!parent) return this.addChild(new ClassItem(name, parent));
		return parent.addChild(new ClassItem(name, parent));
	}

	public addConstructor(name: string, parent?: HierarchyItem): ConstructorItem {
		if (!parent) return this.addChild(new ConstructorItem(name, parent));
		return parent.addChild(new ConstructorItem(name, parent));
	}

	public addProperty(name: string, parent?: HierarchyItem): PropertyItem {
		if (!parent) return this.addChild(new PropertyItem(name, parent));
		return parent.addChild(new PropertyItem(name, parent));
	}

	public addMethod(name: string, parent?: HierarchyItem): MethodItem {
		if (!parent) return this.addChild(new MethodItem(name, parent));
		return parent.addChild(new MethodItem(name, parent));
	}
}

export { Hierarchy };

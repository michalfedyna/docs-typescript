import { ApiNode, ApiNodeType } from "../tree/ApiNode";
import { Name } from "./ApiAttributes";

interface PackageAttributes extends Name {}

class PackageNode extends ApiNode<PackageAttributes> {
	public type: ApiNodeType = ApiNodeType.PackageNode;
}

export { PackageNode, PackageAttributes };

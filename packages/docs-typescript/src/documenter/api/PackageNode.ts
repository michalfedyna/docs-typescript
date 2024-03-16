import { ApiNode, ApiNodeType } from "./ApiNode";
import { Name } from "./ApiAttributes";
import { ApiPackage } from "@microsoft/api-extractor-model";

interface PackageAttributes extends Name {}

class PackageNode extends ApiNode<PackageAttributes> {
	public type: ApiNodeType = ApiNodeType.PackageNode;
}

function extractPackageAttributes(apiPackage: ApiPackage): PackageAttributes {
	const { displayName } = apiPackage;

	return {
		name: displayName
	};
}

export { PackageNode, PackageAttributes, extractPackageAttributes };

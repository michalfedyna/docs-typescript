import { ApiPackage } from "@microsoft/api-extractor-model";

import { ApiNode, ApiNodeType } from "./ApiNode";
import { Docs, Name } from "./ApiAttributes";
import { DocsExtractor } from "../DocsExtractor";

interface PackageAttributes extends Docs, Name {}

class PackageNode extends ApiNode<PackageAttributes> {
	public type: ApiNodeType = ApiNodeType.PackageNode;
}

function extractPackageAttributes(apiPackage: ApiPackage): PackageAttributes {
	const { displayName } = apiPackage;
	const docs = DocsExtractor.extract(apiPackage);

	return {
		docs,
		name: displayName
	};
}

export { PackageNode, PackageAttributes, extractPackageAttributes };

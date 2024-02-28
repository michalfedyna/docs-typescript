import { ApiPackage } from "@microsoft/api-extractor-model";
import { PackageAttributes } from "../hierarchy/items/PackageItem";

function extractPackage(apiPackage: ApiPackage): PackageAttributes {
	const { displayName } = apiPackage;

	return {
		displayName
	};
}

export { extractPackage };

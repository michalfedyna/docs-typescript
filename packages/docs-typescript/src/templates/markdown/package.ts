import Handlebars from "handlebars";

interface PackageContext {}

const PackageTemplate = Handlebars.compile<PackageContext>(``);

export { PackageTemplate, PackageContext };

import { Emitter } from "./Emitter";
import { Hierarchy } from "../hierarchy/Hierarchy";

class HTMLEmitter extends Emitter {
	emit(hierarchy: Hierarchy) {
		console.log(JSON.stringify(hierarchy.toObject(), null, " "));
	}
}

export { HTMLEmitter };

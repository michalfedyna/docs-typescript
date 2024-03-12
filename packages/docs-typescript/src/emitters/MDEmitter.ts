import { Emitter } from "./Emitter";
import { Hierarchy } from "../hierarchy/Hierarchy";

class MDEmitter extends Emitter {
	emit(hierarchy: Hierarchy): void {
		console.log(JSON.stringify(hierarchy.toObject(), null, " "));
	}
}

export { MDEmitter };

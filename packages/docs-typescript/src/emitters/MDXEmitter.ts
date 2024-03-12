import { Emitter } from "./Emitter";
import { Hierarchy } from "../hierarchy/Hierarchy";

class MDXEmitter extends Emitter {
	emit(hierarchy: Hierarchy): void {
		console.log(JSON.stringify(hierarchy.toObject(), null, " "));
	}
}

export { MDXEmitter };

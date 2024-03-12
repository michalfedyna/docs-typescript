import shell from "shelljs";

function generateDeclarations() {
	shell.exec(`tsc --project docs/config/tsconfig.docs.json`);
}

export { generateDeclarations };

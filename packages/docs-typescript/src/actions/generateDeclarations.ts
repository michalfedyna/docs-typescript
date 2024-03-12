import shell from "shelljs";

function generateDeclarations() {
	shell.exec(`tsc --project tsconfig.docs.json`);
}

export { generateDeclarations };

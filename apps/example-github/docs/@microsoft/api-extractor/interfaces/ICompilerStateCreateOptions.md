# ICompilerStateCreateOptions

```typescript
interface ICompilerStateCreateOptions {
  additionalEntryPoints?: string[];
  typescriptCompilerFolder?: string;
}
```

Options for

# Property Signatures

## additionalEntryPoints

```typescript
additionalEntryPoints?: string[];
```

Additional .d.ts files to include in the analysis.

## typescriptCompilerFolder

```typescript
typescriptCompilerFolder?: string;
```

Specifies an alternate folder path to be used when loading the TypeScript system typings.

### Remarks

API Extractor uses its own TypeScript compiler engine to analyze your project. If your project is built with a significantly different TypeScript version, sometimes API Extractor may report compilation errors due to differences in the system typings (e.g. lib.dom.d.ts). You can use the "--typescriptCompilerFolder" option to specify the folder path where you installed the TypeScript package, and API Extractor's compiler will use those system typings instead.

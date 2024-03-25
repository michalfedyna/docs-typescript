# IConfigCompiler

```typescript
interface IConfigCompiler {
  overrideTsconfig?: {};
  skipLibCheck?: boolean;
  tsconfigFilePath?: string;
}
```

Determines how the TypeScript compiler engine will be invoked by API Extractor.

### Remarks

This is part of the structure.

# Property Signatures

## overrideTsconfig

```typescript
overrideTsconfig?: {};
```

Provides a compiler configuration that will be used instead of reading the tsconfig.json file from disk.

### Remarks

The value must conform to the TypeScript tsconfig schema:
http://json.schemastore.org/tsconfig
If omitted, then the tsconfig.json file will instead be read from the projectFolder.

## skipLibCheck

```typescript
skipLibCheck?: boolean;
```

This option causes the compiler to be invoked with the `--skipLibCheck` option.

### Remarks

This option is not recommended and may cause API Extractor to produce incomplete or incorrect declarations, but it may be required when dependencies contain declarations that are incompatible with the TypeScript engine that API Extractor uses for its analysis. Where possible, the underlying issue should be fixed rather than relying on skipLibCheck.

## tsconfigFilePath

```typescript
tsconfigFilePath?: string;
```

Specifies the path to the tsconfig.json file to be used by API Extractor when analyzing the project.

### Remarks

The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.
Note: This setting will be ignored if `overrideTsconfig` is used.

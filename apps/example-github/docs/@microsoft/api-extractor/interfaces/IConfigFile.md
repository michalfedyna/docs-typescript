# IConfigFile

```typescript
interface IConfigFile {
  apiReport?: IConfigApiReport;
  bundledPackages?: string[];
  compiler?: IConfigCompiler;
  docModel?: IConfigDocModel;
  dtsRollup?: IConfigDtsRollup;
  enumMemberOrder?: EnumMemberOrder;
  extends?: string;
  mainEntryPointFilePath: string;
  messages?: IExtractorMessagesConfig;
  newlineKind?: "crlf" | "lf" | "os";
  projectFolder?: string;
  testMode?: boolean;
  tsdocMetadata?: IConfigTsdocMetadata;
}
```

Configuration options for the API Extractor tool. These options can be constructed programmatically or loaded from the api-extractor.json config file using the class.

# Property Signatures

## apiReport

```typescript
apiReport?: IConfigApiReport;
```

Configures how the API report files (\*.api.md) will be generated.

### Remarks

This is part of the structure.

## bundledPackages

```typescript
bundledPackages?: string[];
```

A list of NPM package names whose exports should be treated as part of this package.

### Remarks

For example, suppose that Webpack is used to generate a distributed bundle for the project `library1`, and another NPM package `library2` is embedded in this bundle. Some types from `library2` may become part of the exported API for `library1`, but by default API Extractor would generate a .d.ts rollup that explicitly imports `library2`. To avoid this, we can specify:

```js
  "bundledPackages": [ "library2" ],

```

This would direct API Extractor to embed those types directly in the .d.ts rollup, as if they had been local files for `library1`.

## compiler

```typescript
compiler?: IConfigCompiler;
```

Determines how the TypeScript compiler engine will be invoked by API Extractor.

### Remarks

This is part of the structure.

## docModel

```typescript
docModel?: IConfigDocModel;
```

Configures how the doc model file (\*.api.json) will be generated.

### Remarks

This is part of the structure.

## dtsRollup

```typescript
dtsRollup?: IConfigDtsRollup;
```

Configures how the .d.ts rollup file will be generated.

### Remarks

This is part of the structure.

## enumMemberOrder

```typescript
enumMemberOrder?: EnumMemberOrder;
```

Specifies how API Extractor sorts members of an enum when generating the .api.json file.

### Remarks

By default, the output files will be sorted alphabetically, which is "by-name". To keep the ordering in the source code, specify "preserve".

## extends

```typescript
extends?: string;
```

Optionally specifies another JSON config file that this file extends from. This provides a way for standard settings to be shared across multiple projects.

### Remarks

If the path starts with `./` or `../`, the path is resolved relative to the folder of the file that contains the `extends` field. Otherwise, the first path segment is interpreted as an NPM package name, and will be resolved using NodeJS `require()`.

## mainEntryPointFilePath

```typescript
mainEntryPointFilePath: string;
```

Specifies the .d.ts file to be used as the starting point for analysis. API Extractor analyzes the symbols exported by this module.

### Remarks

The file extension must be ".d.ts" and not ".ts". The path is resolved relative to the "projectFolder" location.

## messages

```typescript
messages?: IExtractorMessagesConfig;
```

Configures how API Extractor reports error and warning messages produced during analysis.

### Remarks

This is part of the structure.

## newlineKind

```typescript
newlineKind?: 'crlf' | 'lf' | 'os';
```

Specifies what type of newlines API Extractor should use when writing output files.

### Remarks

By default, the output files will be written with Windows-style newlines. To use POSIX-style newlines, specify "lf" instead. To use the OS's default newline kind, specify "os".

## projectFolder

```typescript
projectFolder?: string;
```

Determines the `<projectFolder>` token that can be used with other config file settings. The project folder typically contains the tsconfig.json and package.json config files, but the path is user-defined.

### Remarks

The path is resolved relative to the folder of the config file that contains the setting.
The default value for `projectFolder` is the token `<lookup>`, which means the folder is determined using the following heuristics:
If the config/rig.json system is used (as defined by ), then the `<lookup>` value will be the package folder that referenced the rig.
Otherwise, the `<lookup>` value is determined by traversing parent folders, starting from the folder containing api-extractor.json, and stopping at the first folder that contains a tsconfig.json file. If a tsconfig.json file cannot be found in this way, then an error will be reported.

## testMode

```typescript
testMode?: boolean;
```

Set to true when invoking API Extractor's test harness.

### Remarks

When `testMode` is true, the `toolVersion` field in the .api.json file is assigned an empty string to prevent spurious diffs in output files tracked for tests.

## tsdocMetadata

```typescript
tsdocMetadata?: IConfigTsdocMetadata;
```

Configures how the tsdoc-metadata.json file will be generated.

### Remarks

This is part of the structure.

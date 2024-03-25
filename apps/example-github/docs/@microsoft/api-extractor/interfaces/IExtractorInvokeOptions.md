# IExtractorInvokeOptions

```typescript
interface IExtractorInvokeOptions {
  compilerState?: CompilerState;
  localBuild?: boolean;
  messageCallback?: (message: ExtractorMessage) => void;
  showDiagnostics?: boolean;
  showVerboseMessages?: boolean;
  typescriptCompilerFolder?: string;
}
```

Runtime options for Extractor.

# Property Signatures

## compilerState

```typescript
compilerState?: CompilerState;
```

An optional TypeScript compiler state. This allows an optimization where multiple invocations of API Extractor can reuse the same TypeScript compiler analysis.

## localBuild

```typescript
localBuild?: boolean;
```

Indicates that API Extractor is running as part of a local build, e.g. on developer's machine.

### Remarks

This disables certain validation that would normally be performed for a ship/production build. For example, the \*.api.md report file is automatically updated in a local build.
The default value is false.

## messageCallback

```typescript
messageCallback?: (message: ExtractorMessage) => void;
```

An optional callback function that will be called for each `ExtractorMessage` before it is displayed by API Extractor. The callback can customize the message, handle it, or discard it.

### Remarks

If a `messageCallback` is not provided, then by default API Extractor will print the messages to the STDERR/STDOUT console.

## showDiagnostics

```typescript
showDiagnostics?: boolean;
```

If true, API Extractor will print diagnostic information used for troubleshooting problems. These messages will be included as output.

### Remarks

Setting `showDiagnostics=true` forces `showVerboseMessages=true`.

## showVerboseMessages

```typescript
showVerboseMessages?: boolean;
```

If true, API Extractor will include messages in its output.

## typescriptCompilerFolder

```typescript
typescriptCompilerFolder?: string;
```

Specifies an alternate folder path to be used when loading the TypeScript system typings.

### Remarks

API Extractor uses its own TypeScript compiler engine to analyze your project. If your project is built with a significantly different TypeScript version, sometimes API Extractor may report compilation errors due to differences in the system typings (e.g. lib.dom.d.ts). You can use the "--typescriptCompilerFolder" option to specify the folder path where you installed the TypeScript package, and API Extractor's compiler will use those system typings instead.

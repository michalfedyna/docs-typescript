# CompilerState

```typescript
class CompilerState {
  readonly program: unknown;
  static create(
    extractorConfig: ExtractorConfig,
    options?: ICompilerStateCreateOptions,
  ): CompilerState;
}
```

This class represents the TypeScript compiler state. This allows an optimization where multiple invocations of API Extractor can reuse the same TypeScript compiler analysis.

# Properties

## program

```typescript
readonly program: unknown;
```

# Methods

## create

```typescript
static create(extractorConfig: ExtractorConfig, options?: ICompilerStateCreateOptions): CompilerState;
```

Create a compiler state for use with the specified `IExtractorInvokeOptions`.

### Parameters

- #### **extractorConfig** : `ExtractorConfig`

- #### **options** : `ICompilerStateCreateOptions` | _optional_

### Returns

- #### `CompilerState`

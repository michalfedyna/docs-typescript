# Extractor

```typescript
class Extractor {
  static readonly packageName: string;
  static readonly version: string;
  static invoke(
    extractorConfig: ExtractorConfig,
    options?: IExtractorInvokeOptions,
  ): ExtractorResult;
  static loadConfigAndInvoke(
    configFilePath: string,
    options?: IExtractorInvokeOptions,
  ): ExtractorResult;
}
```

The starting point for invoking the API Extractor tool.

# Properties

## packageName

```typescript
static readonly packageName: string;
```

## version

```typescript
static readonly version: string;
```

# Methods

## invoke

```typescript
static invoke(extractorConfig: ExtractorConfig, options?: IExtractorInvokeOptions): ExtractorResult;
```

Invoke API Extractor using an already prepared `ExtractorConfig` object.

### Parameters

- #### **extractorConfig** : `ExtractorConfig`

- #### **options** : `IExtractorInvokeOptions` | _optional_

### Returns

- #### `ExtractorResult`

## loadConfigAndInvoke

```typescript
static loadConfigAndInvoke(configFilePath: string, options?: IExtractorInvokeOptions): ExtractorResult;
```

Load the api-extractor.json config file from the specified path, and then invoke API Extractor.

### Parameters

- #### **configFilePath** : `string`

- #### **options** : `IExtractorInvokeOptions` | _optional_

### Returns

- #### `ExtractorResult`

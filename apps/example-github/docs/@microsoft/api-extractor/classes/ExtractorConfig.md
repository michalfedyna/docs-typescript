# ExtractorConfig

```typescript
class ExtractorConfig {
  readonly alphaTrimmedFilePath: string;
  readonly apiJsonFilePath: string;
  readonly apiReportEnabled: boolean;
  readonly apiReportIncludeForgottenExports: boolean;
  readonly betaTrimmedFilePath: string;
  readonly bundledPackages: string[];
  readonly docModelEnabled: boolean;
  readonly docModelIncludeForgottenExports: boolean;
  readonly enumMemberOrder: EnumMemberOrder;
  static readonly FILENAME: "api-extractor.json";
  static readonly jsonSchema: JsonSchema;
  readonly mainEntryPointFilePath: string;
  readonly messages: IExtractorMessagesConfig;
  readonly newlineKind: NewlineKind;
  readonly omitTrimmingComments: boolean;
  readonly overrideTsconfig: {} | undefined;
  readonly packageFolder: string | undefined;
  readonly packageJson: INodePackageJson | undefined;
  readonly projectFolder: string;
  readonly projectFolderUrl: string | undefined;
  readonly publicTrimmedFilePath: string;
  readonly reportFilePath: string;
  readonly reportTempFilePath: string;
  readonly rollupEnabled: boolean;
  readonly skipLibCheck: boolean;
  readonly testMode: boolean;
  readonly tsconfigFilePath: string;
  readonly tsdocConfigFile: TSDocConfigFile;
  readonly tsdocConfiguration: TSDocConfiguration;
  readonly tsdocMetadataEnabled: boolean;
  readonly tsdocMetadataFilePath: string;
  readonly untrimmedFilePath: string;
  getDiagnosticDump(): string;
  static hasDtsFileExtension(filePath: string): boolean;
  static loadFile(jsonFilePath: string): IConfigFile;
  static loadFileAndPrepare(configJsonFilePath: string): ExtractorConfig;
  static prepare(options: IExtractorConfigPrepareOptions): ExtractorConfig;
  static tryLoadForFolder(
    options: IExtractorConfigLoadForFolderOptions,
  ): IExtractorConfigPrepareOptions | undefined;
}
```

The `ExtractorConfig` class loads, validates, interprets, and represents the api-extractor.json config file.

# Properties

## alphaTrimmedFilePath

```typescript
readonly alphaTrimmedFilePath: string;
```

## apiJsonFilePath

```typescript
readonly apiJsonFilePath: string;
```

## apiReportEnabled

```typescript
readonly apiReportEnabled: boolean;
```

## apiReportIncludeForgottenExports

```typescript
readonly apiReportIncludeForgottenExports: boolean;
```

## betaTrimmedFilePath

```typescript
readonly betaTrimmedFilePath: string;
```

## bundledPackages

```typescript
readonly bundledPackages: string[];
```

## docModelEnabled

```typescript
readonly docModelEnabled: boolean;
```

## docModelIncludeForgottenExports

```typescript
readonly docModelIncludeForgottenExports: boolean;
```

## enumMemberOrder

```typescript
readonly enumMemberOrder: EnumMemberOrder;
```

## FILENAME

```typescript
static readonly FILENAME: 'api-extractor.json';
```

## jsonSchema

```typescript
static readonly jsonSchema: JsonSchema;
```

## mainEntryPointFilePath

```typescript
readonly mainEntryPointFilePath: string;
```

## messages

```typescript
readonly messages: IExtractorMessagesConfig;
```

## newlineKind

```typescript
readonly newlineKind: NewlineKind;
```

## omitTrimmingComments

```typescript
readonly omitTrimmingComments: boolean;
```

## overrideTsconfig

```typescript
readonly overrideTsconfig: {} | undefined;
```

## packageFolder

```typescript
readonly packageFolder: string | undefined;
```

## packageJson

```typescript
readonly packageJson: INodePackageJson | undefined;
```

## projectFolder

```typescript
readonly projectFolder: string;
```

## projectFolderUrl

```typescript
readonly projectFolderUrl: string | undefined;
```

## publicTrimmedFilePath

```typescript
readonly publicTrimmedFilePath: string;
```

## reportFilePath

```typescript
readonly reportFilePath: string;
```

## reportTempFilePath

```typescript
readonly reportTempFilePath: string;
```

## rollupEnabled

```typescript
readonly rollupEnabled: boolean;
```

## skipLibCheck

```typescript
readonly skipLibCheck: boolean;
```

## testMode

```typescript
readonly testMode: boolean;
```

## tsconfigFilePath

```typescript
readonly tsconfigFilePath: string;
```

## tsdocConfigFile

```typescript
readonly tsdocConfigFile: TSDocConfigFile;
```

## tsdocConfiguration

```typescript
readonly tsdocConfiguration: TSDocConfiguration;
```

## tsdocMetadataEnabled

```typescript
readonly tsdocMetadataEnabled: boolean;
```

## tsdocMetadataFilePath

```typescript
readonly tsdocMetadataFilePath: string;
```

## untrimmedFilePath

```typescript
readonly untrimmedFilePath: string;
```

# Methods

## getDiagnosticDump

```typescript
getDiagnosticDump(): string;
```

Returns a JSON-like string representing the `ExtractorConfig` state, which can be printed to a console for diagnostic purposes.

### Remarks

This is used by the "--diagnostics" command-line option. The string is not intended to be deserialized; its format may be changed at any time.

### Returns

- #### `string`

## hasDtsFileExtension

```typescript
static hasDtsFileExtension(filePath: string): boolean;
```

Returns true if the specified file path has the ".d.ts" file extension.

### Parameters

- #### **filePath** : `string`

### Returns

- #### `boolean`

## loadFile

```typescript
static loadFile(jsonFilePath: string): IConfigFile;
```

Performs only the first half of , providing an opportunity to modify the object before it is passed to .

### Remarks

Loads the api-extractor.json config file from the specified file path. If the "extends" field is present, the referenced file(s) will be merged. For any omitted fields, the API Extractor default values are merged.

### Parameters

- #### **jsonFilePath** : `string`

### Returns

- #### `IConfigFile`

## loadFileAndPrepare

```typescript
static loadFileAndPrepare(configJsonFilePath: string): ExtractorConfig;
```

Loads the api-extractor.json config file from the specified file path, and prepares an `ExtractorConfig` object.

### Remarks

Loads the api-extractor.json config file from the specified file path. If the "extends" field is present, the referenced file(s) will be merged. For any omitted fields, the API Extractor default values are merged.
The result is prepared using `ExtractorConfig.prepare()`.

### Parameters

- #### **configJsonFilePath** : `string`

### Returns

- #### `ExtractorConfig`

## prepare

```typescript
static prepare(options: IExtractorConfigPrepareOptions): ExtractorConfig;
```

Prepares an `ExtractorConfig` object using a configuration that is provided as a runtime object, rather than reading it from disk. This allows configurations to be constructed programmatically, loaded from an alternate source, and/or customized after loading.

### Parameters

- #### **options** : `IExtractorConfigPrepareOptions`

### Returns

- #### `ExtractorConfig`

## tryLoadForFolder

```typescript
static tryLoadForFolder(options: IExtractorConfigLoadForFolderOptions): IExtractorConfigPrepareOptions | undefined;
```

Searches for the api-extractor.json config file associated with the specified starting folder, and loads the file if found. This lookup supports .

### Remarks

The search will first look for a package.json file in a parent folder of the starting folder; if found, that will be used as the base folder instead of the starting folder. If the config file is not found in `<baseFolder>/api-extractor.json` or `<baseFolder>/config/api-extractor.json`, then `<baseFolder/config/rig.json` will be checked to see whether a is referenced; if so then the rig's api-extractor.json file will be used instead. If a config file is found, it will be loaded and returned with the `IExtractorConfigPrepareOptions` object. Otherwise, `undefined` is returned to indicate that API Extractor does not appear to be configured for the specified folder.

### Parameters

- #### **options** : `IExtractorConfigLoadForFolderOptions`

### Returns

- #### `IExtractorConfigPrepareOptions | undefined`

  - An options object that can be passed to , or `undefined` if not api-extractor.json file was found.

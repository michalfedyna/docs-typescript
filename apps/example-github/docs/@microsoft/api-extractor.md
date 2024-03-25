# Documentation for `@microsoft/api-extractor` package

API Extractor helps with validation, documentation, and reviewing of the exported API for a TypeScript library. The `@microsoft/api-extractor` package provides the command-line tool. It also exposes a developer API that you can use to invoke API Extractor programmatically.

# Classes

## [CompilerState](./@microsoft/api-extractor/classes/CompilerState.md)

This class represents the TypeScript compiler state. This allows an optimization where multiple invocations of API Extractor can reuse the same TypeScript compiler analysis.

```typescript
class CompilerState {
  readonly program: unknown;
  static create(
    extractorConfig: ExtractorConfig,
    options?: ICompilerStateCreateOptions,
  ): CompilerState;
}
```

## [Extractor](./@microsoft/api-extractor/classes/Extractor.md)

The starting point for invoking the API Extractor tool.

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

## [ExtractorConfig](./@microsoft/api-extractor/classes/ExtractorConfig.md)

The `ExtractorConfig` class loads, validates, interprets, and represents the api-extractor.json config file.

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

## [ExtractorMessage](./@microsoft/api-extractor/classes/ExtractorMessage.md)

This object is used to report an error or warning that occurred during API Extractor's analysis.

```typescript
class ExtractorMessage {
  readonly category: ExtractorMessageCategory;
  handled: boolean;
  logLevel: ExtractorLogLevel;
  readonly messageId:
    | tsdoc.TSDocMessageId
    | ExtractorMessageId
    | ConsoleMessageId
    | string;
  readonly properties: IExtractorMessageProperties;
  readonly sourceFileColumn: number | undefined;
  readonly sourceFileLine: number | undefined;
  readonly sourceFilePath: string | undefined;
  readonly text: string;
  formatMessageWithLocation(
    workingPackageFolderPath: string | undefined,
  ): string;
  formatMessageWithoutLocation(): string;
}
```

## [ExtractorResult](./@microsoft/api-extractor/classes/ExtractorResult.md)

This object represents the outcome of an invocation of API Extractor.

```typescript
class ExtractorResult {
  readonly apiReportChanged: boolean;
  readonly compilerState: CompilerState;
  readonly errorCount: number;
  readonly extractorConfig: ExtractorConfig;
  readonly succeeded: boolean;
  readonly warningCount: number;
}
```

# Enums

## [ConsoleMessageId](./@microsoft/api-extractor/enums/ConsoleMessageId.md)

Unique identifiers for console messages reported by API Extractor.

```typescript
enum ConsoleMessageId {
  ApiReportCopied,
  ApiReportCreated,
  ApiReportFolderMissing,
  ApiReportNotCopied,
  ApiReportUnchanged,
  CompilerVersionNotice,
  Diagnostics,
  FoundTSDocMetadata,
  Preamble,
  UsingCustomTSDocConfig,
  WritingDocModelFile,
  WritingDtsRollup,
}
```

## [ExtractorLogLevel](./@microsoft/api-extractor/enums/ExtractorLogLevel.md)

Used with and .

```typescript
enum ExtractorLogLevel {
  Error,
  Info,
  None,
  Verbose,
  Warning,
}
```

## [ExtractorMessageCategory](./@microsoft/api-extractor/enums/ExtractorMessageCategory.md)

Specifies a category of messages for use with .

```typescript
enum ExtractorMessageCategory {
  Compiler,
  Console,
  Extractor,
  TSDoc,
}
```

## [ExtractorMessageId](./@microsoft/api-extractor/enums/ExtractorMessageId.md)

Unique identifiers for messages reported by API Extractor during its analysis.

```typescript
enum ExtractorMessageId {
  CyclicInheritDoc,
  DifferentReleaseTags,
  ExtraReleaseTag,
  ForgottenExport,
  IncompatibleReleaseTags,
  InternalMissingUnderscore,
  InternalMixedReleaseTag,
  MisplacedPackageTag,
  MissingGetter,
  MissingReleaseTag,
  PreapprovedBadReleaseTag,
  PreapprovedUnsupportedType,
  SetterWithDocs,
  Undocumented,
  UnresolvedInheritDocBase,
  UnresolvedInheritDocReference,
  UnresolvedLink,
  WrongInputFileType,
}
```

# Interfaces

## [ICompilerStateCreateOptions](./@microsoft/api-extractor/interfaces/ICompilerStateCreateOptions.md)

Options for

```typescript
interface ICompilerStateCreateOptions {
  additionalEntryPoints?: string[];
  typescriptCompilerFolder?: string;
}
```

## [IConfigApiReport](./@microsoft/api-extractor/interfaces/IConfigApiReport.md)

Configures how the API report files (\*.api.md) will be generated.

```typescript
interface IConfigApiReport {
  enabled: boolean;
  includeForgottenExports?: boolean;
  reportFileName?: string;
  reportFolder?: string;
  reportTempFolder?: string;
}
```

## [IConfigCompiler](./@microsoft/api-extractor/interfaces/IConfigCompiler.md)

Determines how the TypeScript compiler engine will be invoked by API Extractor.

```typescript
interface IConfigCompiler {
  overrideTsconfig?: {};
  skipLibCheck?: boolean;
  tsconfigFilePath?: string;
}
```

## [IConfigDocModel](./@microsoft/api-extractor/interfaces/IConfigDocModel.md)

Configures how the doc model file (\*.api.json) will be generated.

```typescript
interface IConfigDocModel {
  apiJsonFilePath?: string;
  enabled: boolean;
  includeForgottenExports?: boolean;
  projectFolderUrl?: string;
}
```

## [IConfigDtsRollup](./@microsoft/api-extractor/interfaces/IConfigDtsRollup.md)

Configures how the .d.ts rollup file will be generated.

```typescript
interface IConfigDtsRollup {
  alphaTrimmedFilePath?: string;
  betaTrimmedFilePath?: string;
  enabled: boolean;
  omitTrimmingComments?: boolean;
  publicTrimmedFilePath?: string;
  untrimmedFilePath?: string;
}
```

## [IConfigFile](./@microsoft/api-extractor/interfaces/IConfigFile.md)

Configuration options for the API Extractor tool. These options can be constructed programmatically or loaded from the api-extractor.json config file using the class.

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

## [IConfigMessageReportingRule](./@microsoft/api-extractor/interfaces/IConfigMessageReportingRule.md)

Configures reporting for a given message identifier.

```typescript
interface IConfigMessageReportingRule {
  addToApiReportFile?: boolean;
  logLevel: ExtractorLogLevel;
}
```

## [IConfigMessageReportingTable](./@microsoft/api-extractor/interfaces/IConfigMessageReportingTable.md)

Specifies a table of reporting rules for different message identifiers, and also the default rule used for identifiers that do not appear in the table.

```typescript
interface IConfigMessageReportingTable {
  [messageId: string]: IConfigMessageReportingRule;
}
```

## [IConfigTsdocMetadata](./@microsoft/api-extractor/interfaces/IConfigTsdocMetadata.md)

Configures how the tsdoc-metadata.json file will be generated.

```typescript
interface IConfigTsdocMetadata {
  enabled: boolean;
  tsdocMetadataFilePath?: string;
}
```

## [IExtractorConfigLoadForFolderOptions](./@microsoft/api-extractor/interfaces/IExtractorConfigLoadForFolderOptions.md)

Options for .

```typescript
interface IExtractorConfigLoadForFolderOptions {
  packageJsonLookup?: PackageJsonLookup;
  rigConfig?: IRigConfig;
  startingFolder: string;
}
```

## [IExtractorConfigPrepareOptions](./@microsoft/api-extractor/interfaces/IExtractorConfigPrepareOptions.md)

Options for .

```typescript
interface IExtractorConfigPrepareOptions {
  configObject: IConfigFile;
  configObjectFullPath: string | undefined;
  ignoreMissingEntryPoint?: boolean;
  packageJson?: INodePackageJson | undefined;
  packageJsonFullPath: string | undefined;
  projectFolderLookupToken?: string;
  tsdocConfigFile?: TSDocConfigFile;
}
```

## [IExtractorInvokeOptions](./@microsoft/api-extractor/interfaces/IExtractorInvokeOptions.md)

Runtime options for Extractor.

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

## [IExtractorMessageProperties](./@microsoft/api-extractor/interfaces/IExtractorMessageProperties.md)

Used by .

```typescript
interface IExtractorMessageProperties {
  readonly exportName?: string;
}
```

## [IExtractorMessagesConfig](./@microsoft/api-extractor/interfaces/IExtractorMessagesConfig.md)

Configures how API Extractor reports error and warning messages produced during analysis.

```typescript
interface IExtractorMessagesConfig {
  compilerMessageReporting?: IConfigMessageReportingTable;
  extractorMessageReporting?: IConfigMessageReportingTable;
  tsdocMessageReporting?: IConfigMessageReportingTable;
}
```

---

> Generated using [DocsTypescript](https://github.com/michalfedyna/docs-typescript)

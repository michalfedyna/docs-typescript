# IExtractorConfigPrepareOptions

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

Options for .

# Property Signatures

## configObject

```typescript
configObject: IConfigFile;
```

A configuration object as returned by .

## configObjectFullPath

```typescript
configObjectFullPath: string | undefined;
```

The absolute path of the file that the `configObject` object was loaded from. This is used for error messages and when probing for `tsconfig.json`.

### Remarks

If `configObjectFullPath` and `projectFolderLookupToken` are both unspecified, then the api-extractor.json config file must explicitly specify a `projectFolder` setting rather than relying on the `<lookup>` token.

## ignoreMissingEntryPoint

```typescript
ignoreMissingEntryPoint?: boolean;
```

When preparing the configuration object, folder and file paths referenced in the configuration are checked for existence, and an error is reported if they are not found. This option can be used to disable this check for the main entry point module. This may be useful when preparing a configuration file for an un-built project.

## packageJson

```typescript
packageJson?: INodePackageJson | undefined;
```

The parsed package.json file for the working package, or undefined if API Extractor was invoked without a package.json file.

### Remarks

If omitted, then the `<unscopedPackageName>` and `<packageName>` tokens will have default values.

## packageJsonFullPath

```typescript
packageJsonFullPath: string | undefined;
```

The absolute path of the file that the `packageJson` object was loaded from, or undefined if API Extractor was invoked without a package.json file.

### Remarks

This is used for error messages and when resolving paths found in package.json.
If `packageJsonFullPath` is specified but `packageJson` is omitted, the file will be loaded automatically.

## projectFolderLookupToken

```typescript
projectFolderLookupToken?: string;
```

The default value for the `projectFolder` setting is the `<lookup>` token, which uses a heuristic to guess an appropriate project folder. Use `projectFolderLookupValue` to manually specify the `<lookup>` token value instead.

### Remarks

If the `projectFolder` setting is explicitly specified in api-extractor.json file, it should take precedence over a value specified via the API. Thus the `projectFolderLookupToken` option provides a way to override the default value for `projectFolder` setting while still honoring a manually specified value.

## tsdocConfigFile

```typescript
tsdocConfigFile?: TSDocConfigFile;
```

Allow customization of the tsdoc.json config file. If omitted, this file will be loaded from its default location. If the file does not exist, then the standard definitions will be used from `@microsoft/api-extractor/extends/tsdoc-base.json`.

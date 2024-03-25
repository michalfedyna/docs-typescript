# IExtractorConfigLoadForFolderOptions

```typescript
interface IExtractorConfigLoadForFolderOptions {
  packageJsonLookup?: PackageJsonLookup;
  rigConfig?: IRigConfig;
  startingFolder: string;
}
```

Options for .

# Property Signatures

## packageJsonLookup

```typescript
packageJsonLookup?: PackageJsonLookup;
```

An already constructed `PackageJsonLookup` cache object to use. If omitted, a temporary one will be constructed.

## rigConfig

```typescript
rigConfig?: IRigConfig;
```

An already constructed `RigConfig` object. If omitted, then a new `RigConfig` object will be constructed.

## startingFolder

```typescript
startingFolder: string;
```

The folder path to start from when searching for api-extractor.json.

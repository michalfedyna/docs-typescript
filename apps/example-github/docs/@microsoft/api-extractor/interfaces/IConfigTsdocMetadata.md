# IConfigTsdocMetadata

```typescript
interface IConfigTsdocMetadata {
  enabled: boolean;
  tsdocMetadataFilePath?: string;
}
```

Configures how the tsdoc-metadata.json file will be generated.

### Remarks

This is part of the structure.

# Property Signatures

## enabled

```typescript
enabled: boolean;
```

Whether to generate the tsdoc-metadata.json file.

## tsdocMetadataFilePath

```typescript
tsdocMetadataFilePath?: string;
```

Specifies where the TSDoc metadata file should be written.

### Remarks

The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.
The default value is `<lookup>`, which causes the path to be automatically inferred from the `tsdocMetadata`, `typings` or `main` fields of the project's package.json. If none of these fields are set, the lookup falls back to `tsdoc-metadata.json` in the package folder.

# IConfigDocModel

```typescript
interface IConfigDocModel {
  apiJsonFilePath?: string;
  enabled: boolean;
  includeForgottenExports?: boolean;
  projectFolderUrl?: string;
}
```

Configures how the doc model file (\*.api.json) will be generated.

### Remarks

This is part of the structure.

# Property Signatures

## apiJsonFilePath

```typescript
apiJsonFilePath?: string;
```

The output path for the doc model file. The file extension should be ".api.json".

### Remarks

The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

## enabled

```typescript
enabled: boolean;
```

Whether to generate a doc model file.

## includeForgottenExports

```typescript
includeForgottenExports?: boolean;
```

Whether "forgotten exports" should be included in the doc model file.

### Remarks

Forgotten exports are declarations flagged with `ae-forgotten-export` warnings. See https://api-extractor.com/pages/messages/ae-forgotten-export/ to learn more.

## projectFolderUrl

```typescript
projectFolderUrl?: string;
```

The base URL where the project's source code can be viewed on a website such as GitHub or Azure DevOps. This URL path corresponds to the `<projectFolder>` path on disk.

### Remarks

This URL is concatenated with the file paths serialized to the doc model to produce URL file paths to individual API items. For example, if the `projectFolderUrl` is "https://github.com/microsoft/rushstack/tree/main/apps/api-extractor" and an API item's file path is "api/ExtractorConfig.ts", the full URL file path would be "https://github.com/microsoft/rushstack/tree/main/apps/api-extractor/api/ExtractorConfig.js".
Can be omitted if you don't need source code links in your API documentation reference.

# IConfigApiReport

```typescript
interface IConfigApiReport {
  enabled: boolean;
  includeForgottenExports?: boolean;
  reportFileName?: string;
  reportFolder?: string;
  reportTempFolder?: string;
}
```

Configures how the API report files (\*.api.md) will be generated.

### Remarks

This is part of the structure.

# Property Signatures

## enabled

```typescript
enabled: boolean;
```

Whether to generate an API report.

## includeForgottenExports

```typescript
includeForgottenExports?: boolean;
```

Whether "forgotten exports" should be included in the API report file.

### Remarks

Forgotten exports are declarations flagged with `ae-forgotten-export` warnings. See https://api-extractor.com/pages/messages/ae-forgotten-export/ to learn more.

## reportFileName

```typescript
reportFileName?: string;
```

The filename for the API report files. It will be combined with `reportFolder` or `reportTempFolder` to produce a full output filename.

### Remarks

The file extension should be ".api.md", and the string should not contain a path separator such as `\` or `/`.

## reportFolder

```typescript
reportFolder?: string;
```

Specifies the folder where the API report file is written. The file name portion is determined by the `reportFileName` setting.

### Remarks

The API report file is normally tracked by Git. Changes to it can be used to trigger a branch policy, e.g. for an API review.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

## reportTempFolder

```typescript
reportTempFolder?: string;
```

Specifies the folder where the temporary report file is written. The file name portion is determined by the `reportFileName` setting.

### Remarks

After the temporary file is written to disk, it is compared with the file in the `reportFolder`. If they are different, a production build will fail.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

# IConfigDtsRollup

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

Configures how the .d.ts rollup file will be generated.

### Remarks

This is part of the structure.

# Property Signatures

## alphaTrimmedFilePath

```typescript
alphaTrimmedFilePath?: string;
```

Specifies the output path for a .d.ts rollup file to be generated with trimming for an "alpha" release.

### Remarks

This file will include only declarations that are marked as `@public`, `@beta`, or `@alpha`.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

## betaTrimmedFilePath

```typescript
betaTrimmedFilePath?: string;
```

Specifies the output path for a .d.ts rollup file to be generated with trimming for a "beta" release.

### Remarks

This file will include only declarations that are marked as `@public` or `@beta`.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

## enabled

```typescript
enabled: boolean;
```

Whether to generate the .d.ts rollup file.

## omitTrimmingComments

```typescript
omitTrimmingComments?: boolean;
```

When a declaration is trimmed, by default it will be replaced by a code comment such as "Excluded from this release type: exampleMember". Set "omitTrimmingComments" to true to remove the declaration completely.

## publicTrimmedFilePath

```typescript
publicTrimmedFilePath?: string;
```

Specifies the output path for a .d.ts rollup file to be generated with trimming for a "public" release.

### Remarks

This file will include only declarations that are marked as `@public`.
If the path is an empty string, then this file will not be written.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

## untrimmedFilePath

```typescript
untrimmedFilePath?: string;
```

Specifies the output path for a .d.ts rollup file to be generated without any trimming.

### Remarks

This file will include all declarations that are exported by the main entry point.
If the path is an empty string, then this file will not be written.
The path is resolved relative to the folder of the config file that contains the setting; to change this, prepend a folder token such as `<projectFolder>`.

# IConfigMessageReportingRule

```typescript
interface IConfigMessageReportingRule {
  addToApiReportFile?: boolean;
  logLevel: ExtractorLogLevel;
}
```

Configures reporting for a given message identifier.

### Remarks

This is part of the structure.

# Property Signatures

## addToApiReportFile

```typescript
addToApiReportFile?: boolean;
```

When `addToApiReportFile` is true: If API Extractor is configured to write an API report file (.api.md), then the message will be written inside that file; otherwise, the message is instead logged according to the `logLevel` option.

## logLevel

```typescript
logLevel: ExtractorLogLevel;
```

Specifies whether the message should be written to the the tool's output log.

### Remarks

Note that the `addToApiReportFile` property may supersede this option.

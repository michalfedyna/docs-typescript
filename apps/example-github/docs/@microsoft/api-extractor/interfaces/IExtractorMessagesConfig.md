# IExtractorMessagesConfig

```typescript
interface IExtractorMessagesConfig {
  compilerMessageReporting?: IConfigMessageReportingTable;
  extractorMessageReporting?: IConfigMessageReportingTable;
  tsdocMessageReporting?: IConfigMessageReportingTable;
}
```

Configures how API Extractor reports error and warning messages produced during analysis.

### Remarks

This is part of the structure.

# Property Signatures

## compilerMessageReporting

```typescript
compilerMessageReporting?: IConfigMessageReportingTable;
```

Configures handling of diagnostic messages generating the TypeScript compiler while analyzing the input .d.ts files.

## extractorMessageReporting

```typescript
extractorMessageReporting?: IConfigMessageReportingTable;
```

Configures handling of messages reported by API Extractor during its analysis.

## tsdocMessageReporting

```typescript
tsdocMessageReporting?: IConfigMessageReportingTable;
```

Configures handling of messages reported by the TSDoc parser when analyzing code comments.

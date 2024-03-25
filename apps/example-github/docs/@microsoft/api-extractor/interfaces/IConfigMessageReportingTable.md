# IConfigMessageReportingTable

```typescript
interface IConfigMessageReportingTable {
  [messageId: string]: IConfigMessageReportingRule;
}
```

Specifies a table of reporting rules for different message identifiers, and also the default rule used for identifiers that do not appear in the table.

### Remarks

This is part of the structure.

# Index Signatures

## (indexer)

```typescript
[messageId: string]: IConfigMessageReportingRule;
```

The key is a message identifier for the associated type of message, or "default" to specify the default policy. For example, the key might be `TS2551` (a compiler message), `tsdoc-link-tag-unescaped-text` (a TSDOc message), or `ae-extra-release-tag` (a message related to the API Extractor analysis).

### Returns

- #### `IConfigMessageReportingRule`

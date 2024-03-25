# ConsoleMessageId

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

Unique identifiers for console messages reported by API Extractor.

### Remarks

These strings are possible values for the property when the `ExtractorMessage.category` is .

### Members

- #### `ConsoleMessageId.ApiReportCopied`

  - "You have changed the public API signature for this project. Updating \_\_\_"

- #### `ConsoleMessageId.ApiReportCreated`

  - "The API report file was missing, so a new file was created. Please add this file to Git: \_\_\_"

- #### `ConsoleMessageId.ApiReportFolderMissing`

  - "Unable to create the API report file. Please make sure the target folder exists: \_\_\_"

- #### `ConsoleMessageId.ApiReportNotCopied`

  - "You have changed the public API signature for this project. Please copy the file **_ to _**, or perform a local build (which does this automatically). See the Git repo documentation for more info."
    OR
    "The API report file is missing. Please copy the file **_ to _**, or perform a local build (which does this automatically). See the Git repo documentation for more info."

- #### `ConsoleMessageId.ApiReportUnchanged`

  - "The API report is up to date: \_\_\_"

- #### `ConsoleMessageId.CompilerVersionNotice`

  - "The target project appears to use TypeScript \_\_\_ which is newer than the bundled compiler engine; consider upgrading API Extractor."

- #### `ConsoleMessageId.Diagnostics`

  - Used for the information printed when the "--diagnostics" flag is enabled.

- #### `ConsoleMessageId.FoundTSDocMetadata`

  - "Found metadata in \_\_\_"

- #### `ConsoleMessageId.Preamble`

  - "Analysis will use the bundled TypeScript version \_\_\_"

- #### `ConsoleMessageId.UsingCustomTSDocConfig`

  - "Using custom TSDoc config from \_\_\_"

- #### `ConsoleMessageId.WritingDocModelFile`

  - "Writing: \_\_\_"

- #### `ConsoleMessageId.WritingDtsRollup`

  - "Writing package typings: \_\_\_"

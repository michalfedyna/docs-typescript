# ExtractorMessageCategory

```typescript
enum ExtractorMessageCategory {
  Compiler,
  Console,
  Extractor,
  TSDoc,
}
```

Specifies a category of messages for use with .

### Members

- #### `ExtractorMessageCategory.Compiler`

  - Messages originating from the TypeScript compiler.

- #### `ExtractorMessageCategory.Console`

  - Console messages communicate the progress of the overall operation. They may include newlines to ensure nice formatting. They are output in real time, and cannot be routed to the API Report file.

- #### `ExtractorMessageCategory.Extractor`

  - Messages related to API Extractor's analysis.

- #### `ExtractorMessageCategory.TSDoc`

  - Messages related to parsing of TSDoc comments.

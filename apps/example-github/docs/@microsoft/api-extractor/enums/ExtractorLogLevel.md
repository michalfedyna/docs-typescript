# ExtractorLogLevel

```typescript
enum ExtractorLogLevel {
  Error,
  Info,
  None,
  Verbose,
  Warning,
}
```

Used with and .

### Remarks

This is part of the structure.

### Members

- #### `ExtractorLogLevel.Error`

  - The message will be displayed as an error.

- #### `ExtractorLogLevel.Info`

  - The message will be displayed as an informational message.

- #### `ExtractorLogLevel.None`

  - The message will be discarded entirely.

- #### `ExtractorLogLevel.Verbose`

  - The message will be displayed only when "verbose" output is requested, e.g. using the `--verbose` command line option.

- #### `ExtractorLogLevel.Warning`

  - The message will be displayed as an warning.

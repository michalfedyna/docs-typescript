# ExtractorMessageId

```typescript
enum ExtractorMessageId {
  CyclicInheritDoc,
  DifferentReleaseTags,
  ExtraReleaseTag,
  ForgottenExport,
  IncompatibleReleaseTags,
  InternalMissingUnderscore,
  InternalMixedReleaseTag,
  MisplacedPackageTag,
  MissingGetter,
  MissingReleaseTag,
  PreapprovedBadReleaseTag,
  PreapprovedUnsupportedType,
  SetterWithDocs,
  Undocumented,
  UnresolvedInheritDocBase,
  UnresolvedInheritDocReference,
  UnresolvedLink,
  WrongInputFileType,
}
```

Unique identifiers for messages reported by API Extractor during its analysis.

### Remarks

These strings are possible values for the property when the `ExtractorMessage.category` is .

### Members

- #### `ExtractorMessageId.CyclicInheritDoc`

  - "The `@inheritDoc` tag for \_\_\_ refers to its own declaration."

- #### `ExtractorMessageId.DifferentReleaseTags`

  - "This symbol has another declaration with a different release tag."

- #### `ExtractorMessageId.ExtraReleaseTag`

  - "The doc comment should not contain more than one release tag."

- #### `ExtractorMessageId.ForgottenExport`

  - "The symbol **_ needs to be exported by the entry point _**."

- #### `ExtractorMessageId.IncompatibleReleaseTags`

  - "The symbol **_ is marked as _**, but its signature references **_ which is marked as _**."

- #### `ExtractorMessageId.InternalMissingUnderscore`

  - "The name \_\_\_ should be prefixed with an underscore because the declaration is marked as `@internal`."

- #### `ExtractorMessageId.InternalMixedReleaseTag`

  - "Mixed release tags are not allowed for \_\_\_ because one of its declarations is marked as `@internal`."

- #### `ExtractorMessageId.MisplacedPackageTag`

  - "The `@packageDocumentation` comment must appear at the top of entry point \*.d.ts file."

- #### `ExtractorMessageId.MissingGetter`

  - "The property \_\_\_ has a setter but no getter."

- #### `ExtractorMessageId.MissingReleaseTag`

  - "\_\_\_ is part of the package's API, but it is missing a release tag (`@alpha`, `@beta`, `@public`, or `@internal`)."

- #### `ExtractorMessageId.PreapprovedBadReleaseTag`

  - "The `@preapproved` tag cannot be applied to \_\_\_ without an `@internal` release tag."

- #### `ExtractorMessageId.PreapprovedUnsupportedType`

  - "The `@preapproved` tag cannot be applied to \_\_\_ because it is not a supported declaration type."

- #### `ExtractorMessageId.SetterWithDocs`

  - "The doc comment for the property \_\_\_ must appear on the getter, not the setter."

- #### `ExtractorMessageId.Undocumented`

  - "Missing documentation for \_\_\_."

- #### `ExtractorMessageId.UnresolvedInheritDocBase`

  - "The `@inheritDoc` tag needs a TSDoc declaration reference; signature matching is not supported yet."

- #### `ExtractorMessageId.UnresolvedInheritDocReference`

  - "The `@inheritDoc` reference could not be resolved."

- #### `ExtractorMessageId.UnresolvedLink`

  - "The `@link` reference could not be resolved."

- #### `ExtractorMessageId.WrongInputFileType`

  - "Incorrect file type; API Extractor expects to analyze compiler outputs with the .d.ts file extension. Troubleshooting tips: `https://api-extractor.com/link/dts-error`"

# ExtractorMessage

```typescript
class ExtractorMessage {
  readonly category: ExtractorMessageCategory;
  handled: boolean;
  logLevel: ExtractorLogLevel;
  readonly messageId:
    | tsdoc.TSDocMessageId
    | ExtractorMessageId
    | ConsoleMessageId
    | string;
  readonly properties: IExtractorMessageProperties;
  readonly sourceFileColumn: number | undefined;
  readonly sourceFileLine: number | undefined;
  readonly sourceFilePath: string | undefined;
  readonly text: string;
  formatMessageWithLocation(
    workingPackageFolderPath: string | undefined,
  ): string;
  formatMessageWithoutLocation(): string;
}
```

This object is used to report an error or warning that occurred during API Extractor's analysis.

### Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ExtractorMessage` class.

# Properties

## category

```typescript
readonly category: ExtractorMessageCategory;
```

## handled

```typescript
handled: boolean;
```

## logLevel

```typescript
logLevel: ExtractorLogLevel;
```

## messageId

```typescript
readonly messageId: tsdoc.TSDocMessageId | ExtractorMessageId | ConsoleMessageId | string;
```

## properties

```typescript
readonly properties: IExtractorMessageProperties;
```

## sourceFileColumn

```typescript
readonly sourceFileColumn: number | undefined;
```

## sourceFileLine

```typescript
readonly sourceFileLine: number | undefined;
```

## sourceFilePath

```typescript
readonly sourceFilePath: string | undefined;
```

## text

```typescript
readonly text: string;
```

# Methods

## formatMessageWithLocation

```typescript
formatMessageWithLocation(workingPackageFolderPath: string | undefined): string;
```

Returns the message formatted with its identifier and file position.

### Remarks

Example:

```
src/folder/File.ts:123:4 - (ae-extra-release-tag) The doc comment should not contain more than one release tag.

```

### Parameters

- #### **workingPackageFolderPath** : `string | undefined`

### Returns

- #### `string`

## formatMessageWithoutLocation

```typescript
formatMessageWithoutLocation(): string;
```

### Returns

- #### `string`

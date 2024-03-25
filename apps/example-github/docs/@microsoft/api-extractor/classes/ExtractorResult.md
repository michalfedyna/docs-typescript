# ExtractorResult

```typescript
class ExtractorResult {
  readonly apiReportChanged: boolean;
  readonly compilerState: CompilerState;
  readonly errorCount: number;
  readonly extractorConfig: ExtractorConfig;
  readonly succeeded: boolean;
  readonly warningCount: number;
}
```

This object represents the outcome of an invocation of API Extractor.

### Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ExtractorResult` class.

# Properties

## apiReportChanged

```typescript
readonly apiReportChanged: boolean;
```

## compilerState

```typescript
readonly compilerState: CompilerState;
```

## errorCount

```typescript
readonly errorCount: number;
```

## extractorConfig

```typescript
readonly extractorConfig: ExtractorConfig;
```

## succeeded

```typescript
readonly succeeded: boolean;
```

## warningCount

```typescript
readonly warningCount: number;
```

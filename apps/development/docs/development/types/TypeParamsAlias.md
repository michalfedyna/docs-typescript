# TypeParamsAlias

```typescript
type TypeParamsAlias<T extends string = string> = {
  hello: T;
  world?: T;
};
```

TypeAlias with typeParams

## Remarks

This is just example

## Examples

```typescript
const a: TypeParamsAlias | undefined;
```

## Type Parameters

- ### _T_ extends `string` = `string` | _optional_

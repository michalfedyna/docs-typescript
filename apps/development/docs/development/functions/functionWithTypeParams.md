# functionWithTypeParams

```typescript
function functionWithTypeParams<T extends string = string, K = string>(
  a: T,
  b: K,
): (T | K)[];
```

Function with type parameters to show how library handles typeParam TsDoc tag

### Type Parameters

- #### **T** extends `string` = `string` | _optional_

  - Type param `T` extends string and is default to string

- #### **K** = `string` | _optional_

  - Type param `T`is default to string

### Parameters

- #### **a** : `T`

- #### **b** : `K`

### Returns

- #### `(T | K)[]`

  - Returns tuple of `a` and `b` argument

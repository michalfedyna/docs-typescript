type SimpleType = {
  hello: string;
};

/**
 * BasicTypeAlias example with few properties
 *
 * @remarks This is just example
 */
type BasicTypeAlias = {
  hello: string;
  world: string;
  number: number;
};

/**
 * TypeAlias with typeParams
 *
 * @remarks This is just example
 *
 * @typeParam T - Type param extending string
 *
 * @example
 * ```typescript
 * const a: TypeParamsAlias | undefined;
 * ```
 */
type TypeParamsAlias<T extends string = string> = {
  hello: T;
  world?: T;
};

export { SimpleType, BasicTypeAlias, TypeParamsAlias };

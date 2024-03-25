# Documentation for `development` package

Test library for docs-typescript development

# Classes

## [AnotherClass](./development/classes/AnotherClass.md)

```typescript
class AnotherClass {
  constructor(hello: string);
  hello: string;
  protected static readonly test: string;
  world: string;
}
```

## [BaseClass](./development/classes/BaseClass.md)

BaseClass exported from class.ts
Should be used with care!

```typescript
class BaseClass {
  constructor(name: string);
  name: string;
}
```

## [ConstructorOverloadingClass](./development/classes/ConstructorOverloadingClass.md)

```typescript
class ConstructorOverloadingClass {
  constructor();
  constructor(name: string);
}
```

## [DerivedClass](./development/classes/DerivedClass.md)

```typescript
class DerivedClass extends BaseClass {
  constructor(name: string, value: number);
  value: number;
}
```

## [ImplementingClass](./development/classes/ImplementingClass.md)

```typescript
class ImplementingClass extends BaseClass implements SomeInterface {
  someProperty: string;
  someMethod(): void;
}
```

## [SomeAbstractClass](./development/classes/SomeAbstractClass.md)

Abstract class exported from class.ts
Should be implemented!

```typescript
abstract class SomeAbstractClass {
  abstract someMethod(): void;
}
```

## [SomeClass](./development/classes/SomeClass.md)

SomeClass exported from class.ts, extends `SomeAbstractClass`

```typescript
class SomeClass extends SomeAbstractClass {
  someMethod(): void;
}
```

## [TypeParameterClass](./development/classes/TypeParameterClass.md)

```typescript
class TypeParameterClass<T extends unknown = unknown, K extends any = any>
  implements SomeInterface
{
  protected constructor(someArg: T, anotherArg: K);
  someProperty: string;
  someMethod(): void;
}
```

## [YetAnotherClass](./development/classes/YetAnotherClass.md)

```typescript
class YetAnotherClass {
  constructor(hello?: string);
  hello: string;
}
```

# Functions

## [basicFunction](./development/functions/basicFunction.md)

Some function that return `Hello World` `string`

```typescript
function basicFunction(): string;
```

## [functionWithOptionalParams](./development/functions/functionWithOptionalParams.md)

This is function with optional params

```typescript
function functionWithOptionalParams(a: number, b?: number): number;
```

## [functionWithParams](./development/functions/functionWithParams.md)

```typescript
function functionWithParams(a: number, b: number, c: string | number): number;
```

## [functionWithTypeParams](./development/functions/functionWithTypeParams.md)

Function with type parameters to show how library handles typeParam TsDoc tag

```typescript
function functionWithTypeParams<T extends string = string, K = string>(
  a: T,
  b: K,
): (T | K)[];
```

## [overloadedFunction](./development/functions/overloadedFunction.md)

```typescript
function overloadedFunction(a: string): unknown;
```

## [overloadedFunction](./development/functions/overloadedFunction.md)

```typescript
function overloadedFunction(a: number): unknown;
```

# Interfaces

## [BasicInterface](./development/interfaces/BasicInterface.md)

```typescript
interface BasicInterface {
  string: string;
}
```

## [ConstrainedInterface](./development/interfaces/ConstrainedInterface.md)

```typescript
interface ConstrainedInterface<T extends string = string>
  extends SimpleInterface,
    BasicInterface {
  world: T;
}
```

## [ConstructorInterface](./development/interfaces/ConstructorInterface.md)

```typescript
interface ConstructorInterface {
  new (value: string): Object;
}
```

## [ExtendingInterdace](./development/interfaces/ExtendingInterdace.md)

```typescript
interface ExtendingInterdace extends SimpleInterface {
  world: string;
}
```

## [IndexInterface](./development/interfaces/IndexInterface.md)

```typescript
interface IndexInterface {
  [key: string]: string;
}
```

## [SimpleInterface](./development/interfaces/SimpleInterface.md)

```typescript
interface SimpleInterface {
  hello: string;
}
```

## [SomeInterface](./development/interfaces/SomeInterface.md)

```typescript
interface SomeInterface {
  someProperty: string;
  someMethod(): void;
}
```

# Types

## [BasicTypeAlias](./development/types/BasicTypeAlias.md)

BasicTypeAlias example with few properties

```typescript
type BasicTypeAlias = {
  hello: string;
  world: string;
  number: number;
};
```

## [SimpleType](./development/types/SimpleType.md)

```typescript
type SimpleType = {
  hello: string;
};
```

## [TypeParamsAlias](./development/types/TypeParamsAlias.md)

TypeAlias with typeParams

```typescript
type TypeParamsAlias<T extends string = string> = {
  hello: T;
  world?: T;
};
```

# Variables

## [booleanVariable](./development/variables/booleanVariable.md)

This is boolean varaible
And this will be example how to use that variable

```typescript
let booleanVariable: boolean;
```

## [constVariable](./development/variables/constVariable.md)

```typescript
const constVariable = "const variable";
```

## [constVariableObject](./development/variables/constVariableObject.md)

```typescript
let constVariableObject: {};
```

## [letVariable](./development/variables/letVariable.md)

```typescript
let letVariable: string;
```

## [numberVariable](./development/variables/numberVariable.md)

```typescript
let numberVariable: number;
```

## [stringVariable](./development/variables/stringVariable.md)

```typescript
let stringVariable: string;
```

# Enums

## [SimpleEnum](./development/enums/SimpleEnum.md)

Simple enum named `SimpleEnum`

```typescript
enum SimpleEnum {
  Hello,
}
```

---

> Generated using [DocsTypescript](https://github.com/michalfedyna/docs-typescript)

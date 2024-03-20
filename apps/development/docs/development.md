# Documentation for `development` package

Test library for docs-typescript development

## Classes

### [AnotherClass](./development/classes/AnotherClass.md)

```typescript
class AnotherClass {}
```

### [BaseClass](./development/classes/BaseClass.md)

BaseClass exported from class.ts
Should be used with care!

```typescript
class BaseClass {}
```

### [ConstructorOverloadingClass](./development/classes/ConstructorOverloadingClass.md)

```typescript
class ConstructorOverloadingClass {}
```

### [DerivedClass](./development/classes/DerivedClass.md)

```typescript
class DerivedClass extends BaseClass {}
```

### [ImplementingClass](./development/classes/ImplementingClass.md)

```typescript
class ImplementingClass extends BaseClass implements SomeInterface {}
```

### [SomeAbstractClass](./development/classes/SomeAbstractClass.md)

Abstract class exported from class.ts
Should be implemented!

```typescript
abstract class SomeAbstractClass {}
```

### [SomeClass](./development/classes/SomeClass.md)

SomeClass exported from class.ts

```typescript
class SomeClass extends SomeAbstractClass {}
```

### [TypeParameterClass](./development/classes/TypeParameterClass.md)

```typescript
class TypeParameterClass<T extends unknown = unknown, K extends any = any>
  implements SomeInterface {}
```

### [YetAnotherClass](./development/classes/YetAnotherClass.md)

```typescript
class YetAnotherClass {}
```

## Functions

### [basicFunction](./development/functions/basicFunction.md)

Some function that return `Hello World` `string`

```typescript
function basicFunction(): string {}
```

### [functionWithOptionalParams](./development/functions/functionWithOptionalParams.md)

```typescript
function functionWithOptionalParams(a: number, b?: number): number {}
```

### [functionWithParams](./development/functions/functionWithParams.md)

```typescript
function functionWithParams(a: number, b: number, c: string | number): number {}
```

### [functionWithTypeParams](./development/functions/functionWithTypeParams.md)

```typescript
function functionWithTypeParams<T extends string, K>(a: T, b: K): (T | K)[] {}
```

### [overloadedFunction](./development/functions/overloadedFunction.md)

```typescript
function overloadedFunction(a: string): unknown {}
```

### [overloadedFunction](./development/functions/overloadedFunction.md)

```typescript
function overloadedFunction(a: number): unknown {}
```

## Interfaces

### [BasicInterface](./development/interfaces/BasicInterface.md)

```typescript
interface BasicInterface {}
```

### [ConstrainedInterface](./development/interfaces/ConstrainedInterface.md)

```typescript
interface ConstrainedInterface<T extends string = string>
  extends SimpleInterface,
    BasicInterface {}
```

### [ExtendingInterdace](./development/interfaces/ExtendingInterdace.md)

```typescript
interface ExtendingInterdace extends SimpleInterface {}
```

### [SimpleInterface](./development/interfaces/SimpleInterface.md)

```typescript
interface SimpleInterface {}
```

### [SomeInterface](./development/interfaces/SomeInterface.md)

```typescript
interface SomeInterface {}
```

## Variables

### [booleanVariable](./development/variables/booleanVariable.md)

```typescript
var booleanVariable: boolean;
```

### [constVariable](./development/variables/constVariable.md)

```typescript
var constVariable = "const variable";
```

### [constVariableObject](./development/variables/constVariableObject.md)

```typescript
var constVariableObject: {};
```

### [letVariable](./development/variables/letVariable.md)

```typescript
var letVariable: string;
```

### [numberVariable](./development/variables/numberVariable.md)

```typescript
var numberVariable: number;
```

### [stringVariable](./development/variables/stringVariable.md)

```typescript
var stringVariable: string;
```

## Enums

### [SimpleEnum](./development/enums/SimpleEnum.md)

```typescript
enum SimpleEnum {}
```

## Types

### [SimpleType](./development/types/SimpleType.md)

```typescript
type SimpleType = {
  hello: string;
};
```

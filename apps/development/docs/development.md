# Documentation for `development` package

### Classes
#### [AnotherClass](./development/AnotherClass.md)
```typescript
class AnotherClass {}
```
#### [BaseClass](./development/BaseClass.md)
BaseClass exported from class.ts

Should be used with care!

```typescript
class BaseClass {}
```
#### [ConstructorOverloadingClass](./development/ConstructorOverloadingClass.md)
```typescript
class ConstructorOverloadingClass {}
```
#### [DerivedClass](./development/DerivedClass.md)
```typescript
class DerivedClass extends BaseClass {}
```
#### [ImplementingClass](./development/ImplementingClass.md)
```typescript
class ImplementingClass extends BaseClass implements SomeInterface {}
```
#### [SomeAbstractClass](./development/SomeAbstractClass.md)
Abstract class exported from class.ts

Should be implemented!

```typescript
abstract class SomeAbstractClass {}
```
#### [SomeClass](./development/SomeClass.md)
SomeClass exported from class.ts

```typescript
class SomeClass extends SomeAbstractClass {}
```
#### [TypeParameterClass](./development/TypeParameterClass.md)
```typescript
class TypeParameterClass<T = unknown, K = any> implements SomeInterface {}
```
#### [YetAnotherClass](./development/YetAnotherClass.md)
```typescript
class YetAnotherClass {}
```
### Variables
#### [booleanVariable](./development/booleanVariable.md)
```typescript
var booleanVariable: boolean
```
#### [constVariable](./development/constVariable.md)
```typescript
var constVariable = "const variable"
```
#### [constVariableObject](./development/constVariableObject.md)
```typescript
var constVariableObject: {}
```
#### [letVariable](./development/letVariable.md)
```typescript
var letVariable: string
```
#### [numberVariable](./development/numberVariable.md)
```typescript
var numberVariable: number
```
#### [stringVariable](./development/stringVariable.md)
```typescript
var stringVariable: string
```
### Functions
#### [functionWithOptionalParams](./development/functionWithOptionalParams.md)
```typescript
function functionWithOptionalParams(a: number, b?: number): number {}
```
#### [functionWithParams](./development/functionWithParams.md)
```typescript
function functionWithParams(a: number, b: number, c: string | number): number {}
```
#### [someFunction](./development/someFunction.md)
Some function that return `Hello World` `string`

```typescript
function someFunction(): string {}
```
### Interfaces
#### [SomeInterface](./development/SomeInterface.md)
```typescript
interface SomeInterface 
```

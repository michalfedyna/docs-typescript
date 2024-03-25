/**
 * Abstract class exported from class.ts
 *
 * Should be implemented!
 */
abstract class SomeAbstractClass {
  abstract someMethod(): void;
}

/**
 * SomeClass exported from class.ts, extends {@link SomeAbstractClass}
 *
 * @info
 * This is a class that extends `SomeAbstractClass` and implements `SomeInterface`.
 *
 * @since 1.0.0
 * @public
 */
class SomeClass extends SomeAbstractClass {
  someMethod(): void {
    console.log("SomeClass.someMethod");
  }
}

class AnotherClass {
  public hello: string = "Hello";
  public world: string = "World";
  protected static readonly test: string;

  constructor(hello: string) {
    this.hello = hello;
  }
}

class YetAnotherClass {
  constructor(public hello: string = "World") {}
}

/**
 * BaseClass exported from class.ts
 *
 * Should be used with care!
 * @remarks
 * As a base class, this class has a constructor that takes a `name` parameter.
 */
class BaseClass {
  constructor(public name: string) {
    console.log("BaseClass.constructor");
  }
}

class DerivedClass extends BaseClass {
  constructor(
    name: string,
    public value: number,
  ) {
    super(name);
    console.log("DerivedClass.constructor");
  }
}

interface SomeInterface {
  someMethod(): void;
  someProperty: string;
}

class ImplementingClass extends BaseClass implements SomeInterface {
  public someProperty: string = "ImplementingClass.someProperty";
  someMethod(): void {
    console.log("ImplementingClass.someMethod");
  }
}

class ConstructorOverloadingClass {
  constructor();
  constructor(name: string);
  constructor(name?: string) {
    console.log("ConstructorOverloadingClass.constructor");
  }
}

class TypeParameterClass<T extends unknown = unknown, K extends any = any>
  implements SomeInterface
{
  someProperty: string;

  protected constructor(someArg: T, anotherArg: K) {
    this.someProperty = "TypeParameterClass.someProperty";
  }

  someMethod(): void {}
}

export {
  AnotherClass,
  YetAnotherClass,
  SomeAbstractClass,
  SomeClass,
  BaseClass,
  DerivedClass,
  SomeInterface,
  ImplementingClass,
  ConstructorOverloadingClass,
  TypeParameterClass,
};

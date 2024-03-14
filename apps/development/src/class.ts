/**
 * Abstract class exported from class.ts
 */
abstract class SomeAbstractClass {
  abstract someMethod(): void;
}

/**
 * SomeClass exported from class.ts
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

/**
 * BaseClass exported from class.ts
 *
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

class ImplementingClass implements SomeInterface {
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

export {
  SomeAbstractClass,
  SomeClass,
  BaseClass,
  DerivedClass,
  SomeInterface,
  ImplementingClass,
  ConstructorOverloadingClass,
};

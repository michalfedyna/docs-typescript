/**
 * Abstract class exported from class.ts
 */
abstract class SomeAbstractClass {
  abstract someMethod(): void;
}

class SomeClass extends SomeAbstractClass {
  someMethod(): void {
    console.log("SomeClass.someMethod");
  }
}

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

export {
  SomeAbstractClass,
  SomeClass,
  BaseClass,
  DerivedClass,
  SomeInterface,
  ImplementingClass,
};

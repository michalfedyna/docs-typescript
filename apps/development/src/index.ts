/**
 * Person interface
 * @remarks
 * This is person interface to represent person object
 */
interface Person {
  name: string;
  age: number;
}

/**
 * @props
 */
type PersonType = {
  name: string;
};

/**
 * @jsx
 */
function JSXComponent() {}

class PersonClass implements Person {
  private readonly _name: string;
  age: number;

  constructor(name: string, age: number, personType?: PersonType) {
    this._name = name;
    this.age = age;
  }

  public get name(): string {
    return this._name;
  }

  public printName(): void {
    console.log(this._name);
  }
}

class ExtendsClass extends PersonClass {}

/**
 * This is person object implementation
 * @example
 * ```ts
 *  person.name = "John";
 *  person.age = 30;
 * ```
 */
const person: Person = {
  name: "John",
  age: 30,
};

/**
 * Takes {@link Person} object and prints it
 * @param person - Person object
 * @returns void - No return
 */
function printPerson(person: Person) {
  console.log(person);
}

const printPersonArrow = (person: Person) => {
  console.log(person);
};

export namespace PersonNamespace {
  export const person: Person = {
    name: "John",
    age: 30,
  };

  /**
   * @jsx
   */
  export function ReactComponent() {}
}

/**
 * @hook
 */
function useHook() {}

export {
  Person,
  PersonClass,
  ExtendsClass,
  person,
  printPerson,
  printPersonArrow,
  JSXComponent,
  useHook,
};

export { CarClass } from "./file";

export type { PersonType };

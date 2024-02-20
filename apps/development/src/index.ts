/**
 * Person interface
 * @remarks
 * This is a simple interface for a person
 * @example
 * ```ts
 * const person: Person = {
 *  name: "John",
 *  age: 30,
 *  }
 * ```
 * @public
 */
interface Person {
  name: string;
  age: number;
}

/**
 * Person class {@link Person}
 * @remarks
 * This is a simple class for a person
 * @example
 * ```ts
 * const person = new PersonClass("John", 30);
 * ```
 * @public
 */
class PersonClass implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person: Person = {
  name: "John",
  age: 30,
};

function printPerson(person: Person) {
  console.log(person);
}

const printPersonArrow = (person: Person) => {
  console.log(person);
};

export { Person, PersonClass, person, printPerson, printPersonArrow };

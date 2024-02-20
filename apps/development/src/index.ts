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

export namespace PersonNamespace {
  export const person: Person = {
    name: "John",
    age: 30,
  };
}

/**
 * @hook
 */
function useHook() {}

export {
  Person,
  PersonClass,
  person,
  printPerson,
  printPersonArrow,
  JSXComponent,
  useHook,
};

export type { PersonType };

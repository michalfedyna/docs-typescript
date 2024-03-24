interface SimpleInterface {
  hello: string;
}

interface BasicInterface {
  string: string;
}

interface ExtendingInterdace extends SimpleInterface {
  world: string;
}

interface ConstrainedInterface<T extends string = string>
  extends SimpleInterface,
    BasicInterface {
  world: T;
}

interface ConstructorInterface {
  new (value: string): Object;
}

interface IndexInterface {
  [key: string]: string;
}

export {
  SimpleInterface,
  ExtendingInterdace,
  BasicInterface,
  ConstrainedInterface,
  ConstructorInterface,
  IndexInterface,
};

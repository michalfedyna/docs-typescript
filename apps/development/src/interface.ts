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

export {
  SimpleInterface,
  ExtendingInterdace,
  BasicInterface,
  ConstrainedInterface,
};

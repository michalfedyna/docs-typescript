/**
 *  Some function that return `Hello World` `string`
 */
function basicFunction() {
  return "Hello, World!";
}

function functionWithParams(a: number, b: number, c: string | number) {
  console.log(c);
  return a + b;
}

function functionWithOptionalParams(a: number, b?: number) {
  return a + (b || 0);
}

function functionWithTypeParams<T extends string, K>(a: T, b: K) {
  return [a, b];
}

function overloadedFunction(a: string): unknown;
function overloadedFunction(a: number): unknown;
function overloadedFunction(a: string | number): unknown {
  return a;
}

export {
  basicFunction,
  functionWithParams,
  functionWithOptionalParams,
  functionWithTypeParams,
  overloadedFunction,
};

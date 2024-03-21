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

/**
 * This is function with optional params
 *
 * @param a - Param `a` takes number
 * @param b - Param `b` takes number and is optional
 */
function functionWithOptionalParams(a: number, b?: number) {
  return a + (b || 0);
}

/**
 * Function with type parameters to show how
 * library handles typeParam TsDoc tag
 *
 * @typeParam T - Type param `T` extends string and is default to string
 * @typeParam K - Type param `T`is default to string
 */
function functionWithTypeParams<T extends string = string, K = string>(
  a: T,
  b: K,
) {
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

function someFunction() {
  return "Hello, World!";
}

function functionWithParams(a: number, b: number, c: string | number) {
  console.log(c);
  return a + b;
}

function functionWithOptionalParams(a: number, b?: number) {
  return a + (b || 0);
}

export { someFunction, functionWithParams, functionWithOptionalParams };

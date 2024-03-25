/**
 * Test library for docs-typescript development, serves as showcase of `docs-typescript`
 *
 * @remarks This package implements every possible tag
 *
 * @example
 * ```typescript
 * import * as docs from "docs-typescript";
 *
 * const class = new SomeClass();
 * ```
 * @example
 * ```typescript
 * import * as docs from "docs-typescript";
 *
 * const otherClass = new OtherClass();
 * ```
 *
 * @since 1.0.0
 *
 * @info This is info tag, checking how its working
 *
 * @info another info tag
 *
 * @warning testing warning tag
 *
 * @error testing error tag
 *
 * @author Michal Fedyna
 *
 *
 * @packageDocumentation
 */

export * from "./class";
export * from "./variable";
export * from "./function";
export * from "./interface";
export * from "./enum";
export * from "./type";

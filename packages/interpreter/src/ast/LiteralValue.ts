import type { NumberLiteral } from "./Number";
export { isNumberLiteral } from "./Number";
import type { StringLiteral } from "./String";
export { isStringLiteral } from "./String";
import type { BooleanLiteral } from "./Boolean";
export { isBooleanLiteral } from "./Boolean";
import type { RecordLiteral } from "./Record";
export { isRecordLiteral } from "./Record";

export type LiteralValue<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> = NumberLiteral | StringLiteral | BooleanLiteral | RecordLiteral<N, S, B, R>;

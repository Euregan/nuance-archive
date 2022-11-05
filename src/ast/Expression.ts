import type { NumberExpression } from "./Number";
import type { StringExpression } from "./String";
import type { BooleanExpression } from "./Boolean";
import type { RecordExpression } from "./Record";

export type Expression<
  NumberSlug extends string,
  StringSlug extends string,
  BooleanSlug extends string,
  RecordSlug extends string
> =
  | NumberExpression<NumberSlug, BooleanSlug, RecordSlug>
  | StringExpression<StringSlug, BooleanSlug, RecordSlug>
  | BooleanExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  | RecordExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>;

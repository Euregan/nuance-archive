import type { Expression } from "./ast/Expression";
import type { NumberExpression } from "./ast/Number";
import type { StringExpression } from "./ast/String";
import type { BooleanExpression } from "./ast/Boolean";
import type { RecordExpression } from "./ast/Record";

export type AST<
  NumberSlug extends string = string,
  StringSlug extends string = string,
  BooleanSlug extends string = string,
  RecordSlug extends string = string
> = {
  result: Expression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>;
  numbers: Record<
    NumberSlug,
    NumberExpression<NumberSlug, BooleanSlug, RecordSlug>
  >;
  strings: Record<
    StringSlug,
    StringExpression<StringSlug, BooleanSlug, RecordSlug>
  >;
  booleans: Record<
    BooleanSlug,
    BooleanExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  >;
  records: Record<
    RecordSlug,
    RecordExpression<NumberSlug, StringSlug, BooleanSlug, RecordSlug>
  >;
};

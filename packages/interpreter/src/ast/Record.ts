import type { Expression } from "./Expression";
import type { ActualValue } from "./ActualValue";

export type ActualRecord = { [key: string]: ActualValue };

export type RecordExpression<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> = RecordLiteral<N, S, B, R> | RecordIf<B, R>;

type Reference<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> = ["number", N] | ["string", S] | ["boolean", B] | ["record", R];

export interface RecordLiteral<
  N extends string,
  S extends string,
  B extends string,
  R extends string
> {
  type: "record-literal";
  value: Record<string, Reference<N, S, B, R>>;
}

export interface RecordIf<B extends string, R extends string> {
  type: "record-if";
  condition: B;
  true: R;
  false: R;
}

// Checkers

export const isRecordLiteral = <
  N extends string,
  S extends string,
  B extends string,
  R extends string
>(
  expression: Expression<N, S, B, R>
): expression is RecordLiteral<N, S, B, R> =>
  expression.type === "record-literal";

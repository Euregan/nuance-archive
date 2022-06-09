module Ast exposing (..)


type alias Ast =
    Expression


type Expression
    = Binary Expression BinaryOperator Expression
    | Unary UnaryOperator Expression
    | Number Float
    | String String
    | True
    | False
    | Expression Expression


type BinaryOperator
    = Different
    | Equal
    | GreaterThan
    | GreaterOrEqual
    | LessThan
    | LessOrEqual
    | Minus
    | Plus
    | Multiply
    | Divide


type UnaryOperator
    = Not
    | Negative

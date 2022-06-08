module Ast exposing (..)


type alias Ast =
    Expression


type alias Expression =
    Equality


type alias Equality =
    { comparison : Comparison
    , chain : List ( EqualityOperator, Comparison )
    }


type EqualityOperator
    = Different
    | Equal


type alias Comparison =
    { term : Term
    , chain : List ( ComparisonOperator, Term )
    }


type ComparisonOperator
    = GreaterThan
    | GreaterOrEqual
    | LessThan
    | LessOrEqual


type alias Term =
    { factor : Factor
    , chain : List ( TermOperator, Factor )
    }


type TermOperator
    = Minus
    | Plus


type alias Factor =
    { unary : Unary
    , chain : List ( FactorOperator, Unary )
    }


type FactorOperator
    = Multiply
    | Divide


type Unary
    = Unary ( UnaryOperator, Unary )
    | UnaryPrimary Primary


type UnaryOperator
    = Not
    | Negative


type Primary
    = Number Float
    | String String
    | True
    | False
    | Expression Expression

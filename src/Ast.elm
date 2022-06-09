module Ast exposing (..)

import Html exposing (Html)


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


view : Ast -> Html msg
view ast =
    case ast of
        Binary left operator right ->
            Html.span []
                [ view left
                , Html.text " "
                , case operator of
                    Different ->
                        Html.text "!="

                    Equal ->
                        Html.text "=="

                    GreaterThan ->
                        Html.text ">"

                    GreaterOrEqual ->
                        Html.text ">="

                    LessThan ->
                        Html.text "<"

                    LessOrEqual ->
                        Html.text "<="

                    Minus ->
                        Html.text "-"

                    Plus ->
                        Html.text "+"

                    Multiply ->
                        Html.text "*"

                    Divide ->
                        Html.text "/"
                , Html.text " "
                , view right
                ]

        Unary operator expression ->
            Html.span []
                [ case operator of
                    Negative ->
                        Html.text "-"

                    Not ->
                        Html.text "Not "
                , view expression
                ]

        Number value ->
            Html.text <| String.fromFloat value

        String value ->
            Html.text value

        True ->
            Html.text "True"

        False ->
            Html.text "False"

        Expression expression ->
            Html.span []
                [ Html.text "("
                , view expression
                , Html.text ")"
                ]

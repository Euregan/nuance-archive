module Interpreter exposing (..)

import Ast exposing (Ast, BinaryOperator(..), UnaryOperator(..))
import Html exposing (Html)


type Result
    = Error String
    | Number Float
    | Approved
    | Rejected
    | Undecided


run : Ast -> Result
run ast =
    let
        andThenNumber : (Float -> Result) -> Result -> Result
        andThenNumber fun result =
            case result of
                Number value ->
                    fun value

                Error error ->
                    Error error

                Approved ->
                    Error "Cannot apply a numeric operation to an Approved value"

                Rejected ->
                    Error "Cannot apply a numeric operation to an Rejected value"

                Undecided ->
                    Error "Cannot apply a numeric operation to an Undecided value"

        mapNumber : (Float -> Float) -> Result -> Result
        mapNumber fn =
            andThenNumber (\value -> Number <| fn value)
    in
    case ast of
        Ast.Binary left operator right ->
            let
                leftResult =
                    run left

                rightResult =
                    run right
            in
            case operator of
                Different ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber /= rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                Equal ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber == rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                GreaterThan ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber > rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                GreaterOrEqual ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber >= rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                LessThan ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber < rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                LessOrEqual ->
                    andThenNumber
                        (\leftNumber ->
                            andThenNumber
                                (\rightNumber ->
                                    if leftNumber <= rightNumber then
                                        Approved

                                    else
                                        Rejected
                                )
                                rightResult
                        )
                        leftResult

                Minus ->
                    andThenNumber
                        (\leftNumber ->
                            mapNumber (\rightNumber -> leftNumber - rightNumber) rightResult
                        )
                        leftResult

                Plus ->
                    andThenNumber
                        (\leftNumber ->
                            mapNumber (\rightNumber -> leftNumber + rightNumber) rightResult
                        )
                        leftResult

                Multiply ->
                    andThenNumber
                        (\leftNumber ->
                            mapNumber (\rightNumber -> leftNumber * rightNumber) rightResult
                        )
                        leftResult

                Divide ->
                    andThenNumber
                        (\leftNumber ->
                            mapNumber (\rightNumber -> leftNumber / rightNumber) rightResult
                        )
                        leftResult

        Ast.Unary operator expression ->
            case operator of
                Negative ->
                    mapNumber (\value -> -value) <| run expression

                Not ->
                    Error "Booleans are not supported yet"

        Ast.Number value ->
            Number value

        Ast.String value ->
            Error "Strings are not supported yet"

        Ast.True ->
            Approved

        Ast.False ->
            Rejected

        Ast.Expression expression ->
            run expression


view : Result -> Html msg
view result =
    Html.div []
        [ Html.text <|
            case result of
                Error error ->
                    error

                Number value ->
                    String.fromFloat value

                Approved ->
                    "Approved"

                Rejected ->
                    "Rejected"

                Undecided ->
                    "Undecided"
        ]

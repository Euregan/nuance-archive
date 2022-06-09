module Scanner exposing (..)

import Ast exposing (..)
import Html exposing (Html)
import Parser exposing ((|.), (|=), Parser, Step(..))
import Source exposing (Source)


type Error
    = None


type alias Scanned =
    Result (List Parser.DeadEnd) Ast


binaryParser : Parser Expression -> Parser BinaryOperator -> (Expression -> BinaryOperator -> Expression -> Expression) -> Parser Expression
binaryParser childParser operatorParser constructor =
    let
        subParser : List ( BinaryOperator, Expression ) -> Parser (Step (List ( BinaryOperator, Expression )) (List ( BinaryOperator, Expression )))
        subParser children =
            Parser.oneOf
                [ Parser.succeed (\operator child -> Loop (( operator, child ) :: children))
                    |= operatorParser
                    |. Parser.spaces
                    |= childParser
                , Parser.succeed (Done (List.reverse children))
                ]

        flatten : Expression -> List ( BinaryOperator, Expression ) -> Expression
        flatten child list =
            case list of
                [] ->
                    child

                ( operator, nextChild ) :: tail ->
                    constructor child operator (flatten nextChild tail)
    in
    Parser.succeed flatten
        |= childParser
        |. Parser.spaces
        |= Parser.loop [] subParser


parser : Parser Ast
parser =
    expressionParser


expressionParser : Parser Expression
expressionParser =
    equalityParser


equalityParser : Parser Expression
equalityParser =
    binaryParser
        comparisonParser
        (Parser.oneOf
            [ Parser.map (\_ -> Different) (Parser.symbol "!=")
            , Parser.map (\_ -> Equal) (Parser.symbol "==")
            ]
        )
        Binary


comparisonParser : Parser Expression
comparisonParser =
    binaryParser
        termParser
        (Parser.oneOf
            [ Parser.map (\_ -> GreaterThan) (Parser.symbol ">")
            , Parser.map (\_ -> GreaterOrEqual) (Parser.symbol ">=")
            , Parser.map (\_ -> LessThan) (Parser.symbol "<")
            , Parser.map (\_ -> LessOrEqual) (Parser.symbol "<=")
            ]
        )
        Binary


termParser : Parser Expression
termParser =
    binaryParser
        factorParser
        (Parser.oneOf
            [ Parser.map (\_ -> Minus) (Parser.symbol "-")
            , Parser.map (\_ -> Plus) (Parser.symbol "+")
            ]
        )
        Binary


factorParser : Parser Expression
factorParser =
    binaryParser
        unaryParser
        (Parser.oneOf
            [ Parser.map (\_ -> Multiply) (Parser.symbol "*")
            , Parser.map (\_ -> Divide) (Parser.symbol "/")
            ]
        )
        Binary


unaryParser : Parser Expression
unaryParser =
    let
        unaryOperatorParser : Parser UnaryOperator
        unaryOperatorParser =
            Parser.oneOf
                [ Parser.map (\_ -> Not) (Parser.keyword "Not")
                , Parser.map (\_ -> Negative) (Parser.symbol "-")
                ]
    in
    Parser.oneOf
        [ Parser.succeed Unary
            |= unaryOperatorParser
            |= Parser.lazy (\_ -> unaryParser)
        , primaryParser
        ]


primaryParser : Parser Expression
primaryParser =
    let
        stringParser : Parser String.String
        stringParser =
            Parser.map (\string -> string |> String.dropLeft 1 |> String.dropRight 1) <|
                Parser.getChompedString <|
                    Parser.succeed ()
                        |. Parser.chompIf (\c -> c == '"')
                        |. Parser.chompUntil "\""
                        |. Parser.chompIf (\c -> c == '"')

        groupParser : Parser Expression
        groupParser =
            Parser.succeed identity
                |. Parser.symbol "("
                |= Parser.lazy (\_ -> expressionParser)
                |. Parser.symbol ")"
    in
    Parser.oneOf
        [ Parser.map (\value -> Ast.String value) stringParser
        , Parser.map (\value -> Number value) Parser.float
        , Parser.map (\_ -> Ast.True) (Parser.keyword "True")
        , Parser.map (\_ -> Ast.False) (Parser.keyword "False")
        , Parser.map (\expr -> Expression expr) groupParser
        ]


scan : Source -> Scanned
scan source =
    Parser.run parser (Source.raw source)


view : Scanned -> Html msg
view scanned =
    case scanned of
        Ok ast ->
            Ast.view ast

        Err errors ->
            Html.text "oh no"

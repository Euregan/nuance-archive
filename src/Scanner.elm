module Scanner exposing (..)

import Ast exposing (..)
import Parser exposing ((|.), (|=), Parser, Step(..))
import Source exposing (Source)


type Error
    = None


type alias Scanned =
    Result (List Parser.DeadEnd) Ast


recursiveParser : Parser c -> Parser o -> (c -> List ( o, c ) -> p) -> Parser p
recursiveParser childParser operatorParser constructor =
    let
        subParser : List ( o, c ) -> Parser (Step (List ( o, c )) (List ( o, c )))
        subParser children =
            Parser.oneOf
                [ Parser.succeed (\operator child -> Loop (( operator, child ) :: children))
                    |= operatorParser
                    |. Parser.spaces
                    |= childParser
                , Parser.succeed (Done (List.reverse children))
                ]
    in
    Parser.succeed constructor
        |= childParser
        |. Parser.spaces
        |= Parser.loop [] subParser


parser : Parser Ast
parser =
    expressionParser


expressionParser : Parser Expression
expressionParser =
    equalityParser


equalityParser : Parser Equality
equalityParser =
    recursiveParser
        comparisonParser
        (Parser.oneOf
            [ Parser.map (\_ -> Different) (Parser.symbol "!=")
            , Parser.map (\_ -> Equal) (Parser.symbol "==")
            ]
        )
        Equality


comparisonParser : Parser Comparison
comparisonParser =
    recursiveParser
        termParser
        (Parser.oneOf
            [ Parser.map (\_ -> GreaterThan) (Parser.symbol ">")
            , Parser.map (\_ -> GreaterOrEqual) (Parser.symbol ">=")
            , Parser.map (\_ -> LessThan) (Parser.symbol "<")
            , Parser.map (\_ -> LessOrEqual) (Parser.symbol "<=")
            ]
        )
        Comparison


termParser : Parser Term
termParser =
    recursiveParser
        factorParser
        (Parser.oneOf
            [ Parser.map (\_ -> Minus) (Parser.symbol "-")
            , Parser.map (\_ -> Plus) (Parser.symbol "+")
            ]
        )
        Term


factorParser : Parser Factor
factorParser =
    recursiveParser
        unaryParser
        (Parser.oneOf
            [ Parser.map (\_ -> Multiply) (Parser.symbol "*")
            , Parser.map (\_ -> Divide) (Parser.symbol "/")
            ]
        )
        Factor


unaryParser : Parser Unary
unaryParser =
    let
        unaryOperatorParser : Parser UnaryOperator
        unaryOperatorParser =
            Parser.oneOf
                [ Parser.map (\_ -> Not) (Parser.symbol "!")
                , Parser.map (\_ -> Negative) (Parser.symbol "-")
                ]
    in
    Parser.oneOf
        [ Parser.succeed (\operator unary -> Unary ( operator, unary ))
            |= unaryOperatorParser
            |= Parser.lazy (\_ -> unaryParser)
        , Parser.map (\primary -> UnaryPrimary primary) primaryParser
        ]


primaryParser : Parser Primary
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

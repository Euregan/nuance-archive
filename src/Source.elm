module Source exposing (Source, charAt, init, length, raw, view)

import Html exposing (Html)
import Html.Events exposing (onInput)


type Source
    = Source String


init : String -> Source
init string =
    Source string


raw : Source -> String
raw (Source source) =
    source


view : (Source -> msg) -> Source -> Html msg
view onSourceChange (Source source) =
    Html.textarea [ onInput (\value -> onSourceChange (Source value)) ] [ Html.text source ]


length : Source -> Int
length (Source source) =
    String.length
        source


charAt : Source -> Int -> Maybe Char
charAt (Source source) position =
    source
        |> String.left position
        |> String.uncons
        |> Maybe.map Tuple.first

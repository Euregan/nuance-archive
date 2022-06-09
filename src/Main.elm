module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Interpreter exposing (Result(..))
import Scanner exposing (Scanned)
import Source exposing (Source)


main =
    Browser.sandbox { init = init, update = update, view = view }


type alias Model =
    { source : Source
    , ast : Maybe Scanned
    , result : Maybe Result
    }


init : Model
init =
    { source = Source.init "(2 + 3) * 4"
    , ast = Nothing
    , result = Nothing
    }


type Msg
    = SourceChanged Source
    | Scan
    | Run


update : Msg -> Model -> Model
update msg model =
    case msg of
        SourceChanged source ->
            { model | source = source }

        Scan ->
            { model
                | ast = Just <| Scanner.scan model.source
                , result = Nothing
            }

        Run ->
            { model
                | ast = Just <| Scanner.scan model.source
                , result = Result.toMaybe <| Result.map Interpreter.run <| Scanner.scan model.source
            }


view : Model -> Html Msg
view model =
    div []
        [ Source.view SourceChanged model.source
        , div []
            [ button [ onClick Scan ] [ text "Scan" ]
            , button [ onClick Run ] [ text "Run" ]
            ]
        , case model.ast of
            Nothing ->
                text ""

            Just scanned ->
                Scanner.view scanned
        , case model.result of
            Nothing ->
                text ""

            Just result ->
                Interpreter.view result
        ]

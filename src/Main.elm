module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Scanner exposing (Scanned)
import Source exposing (Source)


main =
    Browser.sandbox { init = init, update = update, view = view }


type alias Model =
    { source : Source
    , ast : Maybe Scanned
    }


init : Model
init =
    { source = Source.init "(2 + 3) * 4"
    , ast = Nothing
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
            { model | ast = Just <| Scanner.scan model.source }

        Run ->
            { model | ast = Just <| Scanner.scan model.source }


view : Model -> Html Msg
view model =
    div []
        [ Source.view SourceChanged model.source
        , div []
            [ button [ onClick Scan ] [ text "Scan" ]
            , button [ onClick Run ] [ text "Run" ]
            ]
        ]

module Scanner.Token exposing (..)


type Token
    = -- Single-character tokens.
      LeftParenthesis
    | RightParenthesis
    | LeftBrace
    | RightBrace
    | Comma
    | Minus
    | Plus
    | Slash
    | Star
    | -- One or two character tokens.
      Bang
    | BangEqual
    | Equal
    | EqualEqual
    | Greater
    | GreaterEqual
    | Less
    | LessEqual
    | -- Literals.
      Identifier
    | String
    | Number
    | -- Keywords.
      And
    | Else
    | False
    | Function
    | If
    | Or
    | True
    | Eof

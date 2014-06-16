class Color
    constructor: ->
        @div = $("<div>",
            css:
                position: "absolute"
                cursor: "default"
                fontSize: "5em"
                width: "100%"
                height: "100%"
                top: "0"
                left: "0"
        )
        .appendTo("body")

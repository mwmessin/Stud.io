class @Color
    constructor: ->
        @div = $("<div>")
            .position 'absolute'
            .display 'none'
            .width 100
            .height 100
            .background 'black'
            .appendTo 'body'

    toggle: (event) =>
        {pageX, pageY} = event
        @div
            .display 'block'
            .top pageY
            .left pageX

    hue: (event) =>

    opacity: (event) =>

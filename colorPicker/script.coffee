class @Color
    constructor: ->
        @div = $("<div>")
            .position 'absolute'
            .display 'none'
            .width 100
            .height 100
            .background 'black'
            .appendTo 'body'

        @hue = $("<div>")
            .background 'url(hue.png)'
            .mousemove @changeHue
            .appendTo @div

        @saturation = $("<div>")
            .background 'url(saturation.png)'
            .mousemove @changeHue
            .appendTo @div

    toggle: (event) =>
        {pageX, pageY} = event
        @div
            .display 'block'
            .top pageY
            .left pageX

    changeHue: (event) => log event

    changeSaturation: (event) => log event

    changeOpacity: (event) => log event

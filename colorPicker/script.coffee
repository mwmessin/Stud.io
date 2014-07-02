class @Color
    constructor: ->
        @div = $("<div>")
            .position 'absolute'
            .display 'none'
            .width 296
            .height 256
            .background 'black'
            .appendTo 'body'

        @hue = $("<div>")
            .width 20
            .height 256
            .float 'left'
            .background 'url(colorPicker/hue.png)'
            .mousemove @changeHue
            .appendTo @div

        @saturation = $("<div>")
            .width 256
            .height 256
            .float 'left'
            .background 'url(colorPicker/saturation.png)'
            .mousemove @changeHue
            .appendTo @div

        @opacity = $("<div>")
            .width 20
            .height 256
            .float 'left'
            .background 'url(colorPicker/opacity.png)'
            .mousemove @changeHue
            .appendTo @div

    open: ({pageX, pageY}) =>
        @div
            .display 'block'
            .top pageY
            .left pageX
        $('body').mousedown @close

    close: (event) => 
        @div.display 'none'
        $('body').off 'click', @close

    changeHue: (event) => log event

    changeSaturation: (event) => log event

    changeOpacity: (event) => log event

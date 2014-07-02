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
            .mousedown @changeHue
            .mousemove @changeHue
            .appendTo @div

        @saturation = $("<div>")
            .width 256
            .height 256
            .float 'left'
            .background 'url(colorPicker/saturation.png)'
            .mousedown @changeHue
            .mousemove @changeHue
            .appendTo @div

        @opacity = $("<div>")
            .width 20
            .height 256
            .float 'left'
            .background 'url(colorPicker/opacity.png)'
            .mousedown @changeHue
            .mousemove @changeHue
            .appendTo @div

    open: ({pageX, pageY}) =>
        @div
            .display 'block'
            .top pageY
            .left pageX

        $('body').mousedown 'left', @close
        @isOpen = true

    close: => 
        @div.display 'none'
        $('body').off 'click', @close
        @isOpen = false

    changeHue: (event) => log event

    changeSaturation: (event) => log event

    changeOpacity: (event) => log event

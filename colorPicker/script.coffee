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
            .mousedown @changeSaturation
            .mousemove @changeSaturation
            .appendTo @div

        @opacity = $("<div>")
            .width 20
            .height 256
            .float 'left'
            .background 'url(colorPicker/opacity.png)'
            .mousedown @changeOpacity
            .mousemove @changeOpacity
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

    changeHue: ({offsetX, offsetY}) => 
        x = offsetY / 256

        if x < 1 / 3
            red = -3 * x + 1
            green = 3 * x
            blue = 0
        else if x < 2 / 3
            red = 0
            green = -3 * x + 2
            blue = 3 * x - 1
        else
            red = 3 * x - 2
            green = 0
            blue = -3 * x + 3

        log red, green, blue

    changeSaturation: ({pageX, pageY}) => 


    changeOpacity: ({pageX, pageY}) => 


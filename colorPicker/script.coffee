class @Color
    constructor: ->
        @selectedHue = [0, 0, 0]
        @selectedSaturation = [0, 0, 0]
        @selectedColor = [0, 0, 0, 1]

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
            .cursor 'crosshair'
            .background 'url(colorPicker/hue.png)'
            .mousedown @changeHue
            .mousemove (event) => @changeHue(event) if window.dragging
            .appendTo @div

        @saturation = $("<div>")
            .width 256
            .height 256
            .float 'left'
            .cursor 'crosshair'
            .background 'url(colorPicker/saturation.png)'
            .mousedown @changeSaturation
            .mousemove (event) => @changeSaturation(event) if window.dragging
            .appendTo @div

        @opacity = $("<div>")
            .width 20
            .height 256
            .float 'left'
            .cursor 'crosshair'
            .background 'url(colorPicker/opacity.png)'
            .mousedown @changeOpacity
            .mousemove (event) => @changeOpacity(event) if window.dragging
            .appendTo @div

    open: ({pageX, pageY}) =>
        @isOpen = true
        @div
            .display 'block'
            .top pageY
            .left pageX

    close: =>
        @isOpen = false
        @div.display 'none'

    changeHue: ({offsetY}) =>
        y = offsetY / 256

        if y < 1 / 3
            r = ((-3 * y + 1) * 2).min(1)
            g = ((3 * y) * 2).min(1)
            b = 0
        else if y < 2 / 3
            r = 0
            g = ((-3 * y + 2) * 2).min(1)
            b = ((3 * y - 1) * 2).min(1)
        else
            r = ((3 * y - 2) * 2).min(1)
            g = 0
            b = ((-3 * y + 3) * 2).min(1)

        @selectedHue = [r, g, b]
        @selectedSaturation = [r, g, b]
        @selectedColor = [r, g, b, 1]
        @saturation.backgroundColor @selectedHue.toColorHex()
        @opacity.backgroundColor @selectedSaturation.toColorHex()

    changeSaturation: ({offsetX, offsetY}) =>
        x = offsetX / 256
        y = offsetY / 256

        [r, g, b] = @selectedHue

        r = 1 - x + r * x
        g = 1 - x + g * x
        b = 1 - x + b * x

        r = r * (1 - y)
        g = g * (1 - y)
        b = b * (1 - y)

        @selectedSaturation = [r, g, b]
        @selectedColor = [r, g, b, 1]
        @opacity.backgroundColor @selectedSaturation.toColorHex()

    changeOpacity: ({offsetY}) =>
        y = offsetY / 256

        [r, g, b] = @selectedSaturation

        @selectedColor = [r, g, b, 1 - y]



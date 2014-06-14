$ -> new class
    constructor: ->
        @keyboard = {}

        @color = new Color()

        @canvas = $("<canvas>")
        .width window.width
        .attr 'width', window.width
        .height window.height
        .attr 'height', window.height
        .mousedown @mousedown
        .touchstart @mousedown
        .mousemove @mousemove
        .touchmove @mousemove
        .mouseup @mouseup
        .touchend @mouseup
        .contextmenu @contextmenu
        .keydown @keydown
        .keyup @keyup
        .appendTo "body"
        
        @context = @canvas.context2d()

    keydown: (event) =>
        code = event.which
        char = {"27":"esc"}[code] or String.fromCharCode(code)
        if not @keyboard[char]
            console.log char, code
            switch char
                when "R" then window.location.reload()
                when "C" then @color.show()
                else 
        @keyboard[char] = true
        event.preventDefault()
        return false

    keyup: (event) =>
        code = event.which
        char = {"27":"esc"}[code] or String.fromCharCode(code)
        @keyboard[char] = false

    contextmenu: (event) =>
        event.preventDefault()
        return false

    mousedown: (event) =>
        event.preventDefault()
        {pageX, pageY, touches} = event
        touch = if touches then touches[0] or touches[1] else {}
        @dragging = true
        @paint(@x = touch.pageX or pageX, @y = touch.pageY or pageY)
        return false

    mousemove: (event) =>
        event.preventDefault()
        {pageX, pageY, touches} = event
        touch = if touches then touches[0] or touches[1] else {}
        x = touch.pageX or pageX
        y = touch.pageY or pageY
        if @dragging and (x isnt @x or y isnt @y)
            @line(x, y, @x, @y)
        @x = x
        @y = y
        return false

    mouseup: (event) =>
        event.preventDefault()
        @dragging = false
        return false

    paint: (x, y) =>
        @context.fillStyle = 'black'
        @context.fillRect(x, y, 1, 1)

    line: (x0, y0, x1, y1) =>
        @context.beginPath()
        @context.moveTo(x0, y0)
        @context.lineTo(x1, y1)
        @context.closePath()
        @context.stroke()

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




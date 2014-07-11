$ -> 
    colorPicker = new Color

    brush = new Tool(
        cursor: 'crosshair'

        line: (x0, y0, x1, y1) ->
            [r, g, b, a] = colorPicker.selectedColor
            @context.strokeStyle = "rgba(#{r * 255 | 0},#{g * 255 | 0},#{b * 255 | 0},#{a})"
            @context.beginPath()
            @context.moveTo(x0, y0)
            @context.lineTo(x1, y1)
            @context.closePath()
            @context.stroke()

        contextmenu: ->
            if colorPicker.isOpen
                colorPicker.close()
            else
                colorPicker.open(event)
    )

    radius = new Tool(
        cursor: 'crosshair'
    )

    new class
        constructor: ->
            @canvas = $('<canvas>')
                .position 'absolute'
                .width window.width
                .cursor 'crosshair'
                .attr 'width', window.width
                .height window.height
                .attr 'height', window.height
                .mousedown 'left', @mousedown
                .touchstart @mousedown
                .mousemove @mousemove
                .touchmove @mousemove
                .mouseup @mouseup
                .touchend @mouseup
                .contextmenu @contextmenu
                .appendTo 'body'
            
            @context = @canvas.context2d()

            @pick brush

        pick: (@tool) ->
            @canvas.cursor @tool.cursor
            @tool.context = @context

        contextmenu: (event) =>
            event.preventDefault()
            @tool.contextmenu(event)

        mousedown: ({pageX, pageY, touches}) =>
            touch = if touches then touches[0] or touches[1] else {}
            @dragging = true
            @x = touch.pageX or pageX
            @y = touch.pageY or pageY
            @tool.line(@x, @y, @x + 1, @y + 1)
            return false

        mousemove: (event) =>
            event.preventDefault()
            {pageX, pageY, touches} = event
            touch = if touches then touches[0] or touches[1] else {}
            x = touch.pageX or pageX
            y = touch.pageY or pageY
            if @dragging and (x isnt @x or y isnt @y)
                @tool.line(x, y, @x, @y)
            @x = x
            @y = y
            return false

        mouseup: (event) =>
            event.preventDefault()
            @dragging = false
            return false


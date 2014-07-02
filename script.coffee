$ -> new class
    constructor: ->
        @keyboard = {}

        @canvas = $('<canvas>')
            .position 'absolute'
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
            .appendTo 'body'

        @color = new Color
        
        @context = @canvas.context2d()

    contextmenu: (event) =>
        event.preventDefault()
        @color.open(event)

    mousedown: ({pageX, pageY, touches}) =>
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

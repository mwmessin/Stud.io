(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    return new ((function() {
      function _Class() {
        this.line = __bind(this.line, this);
        this.paint = __bind(this.paint, this);
        this.mouseup = __bind(this.mouseup, this);
        this.mousemove = __bind(this.mousemove, this);
        this.mousedown = __bind(this.mousedown, this);
        this.contextmenu = __bind(this.contextmenu, this);
        this.keyboard = {};
        this.canvas = $('<canvas>').position('absolute').width(window.width).attr('width', window.width).height(window.height).attr('height', window.height).mousedown(this.mousedown).touchstart(this.mousedown).mousemove(this.mousemove).touchmove(this.mousemove).mouseup(this.mouseup).touchend(this.mouseup).contextmenu(this.contextmenu).appendTo('body');
        this.color = new Color;
        this.context = this.canvas.context2d();
      }

      _Class.prototype.contextmenu = function(event) {
        event.preventDefault();
        return this.color.open(event);
      };

      _Class.prototype.mousedown = function(_arg) {
        var pageX, pageY, touch, touches;
        pageX = _arg.pageX, pageY = _arg.pageY, touches = _arg.touches;
        touch = touches ? touches[0] || touches[1] : {};
        this.dragging = true;
        this.paint(this.x = touch.pageX || pageX, this.y = touch.pageY || pageY);
        return false;
      };

      _Class.prototype.mousemove = function(event) {
        var pageX, pageY, touch, touches, x, y;
        event.preventDefault();
        pageX = event.pageX, pageY = event.pageY, touches = event.touches;
        touch = touches ? touches[0] || touches[1] : {};
        x = touch.pageX || pageX;
        y = touch.pageY || pageY;
        if (this.dragging && (x !== this.x || y !== this.y)) {
          this.line(x, y, this.x, this.y);
        }
        this.x = x;
        this.y = y;
        return false;
      };

      _Class.prototype.mouseup = function(event) {
        event.preventDefault();
        this.dragging = false;
        return false;
      };

      _Class.prototype.paint = function(x, y) {
        this.context.fillStyle = 'black';
        return this.context.fillRect(x, y, 1, 1);
      };

      _Class.prototype.line = function(x0, y0, x1, y1) {
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.closePath();
        return this.context.stroke();
      };

      return _Class;

    })());
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Color = (function() {
    function Color() {
      this.changeOpacity = __bind(this.changeOpacity, this);
      this.changeSaturation = __bind(this.changeSaturation, this);
      this.changeHue = __bind(this.changeHue, this);
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      this.div = $("<div>").position('absolute').display('none').width(296).height(256).background('black').appendTo('body');
      this.hue = $("<div>").width(20).height(256).float('left').background('url(colorPicker/hue.png)').mousemove(this.changeHue).appendTo(this.div);
      this.saturation = $("<div>").width(256).height(256).float('left').background('url(colorPicker/saturation.png)').mousemove(this.changeHue).appendTo(this.div);
      this.opacity = $("<div>").width(20).height(256).float('left').background('url(colorPicker/opacity.png)').mousemove(this.changeHue).appendTo(this.div);
    }

    Color.prototype.open = function(_arg) {
      var pageX, pageY;
      pageX = _arg.pageX, pageY = _arg.pageY;
      this.div.display('block').top(pageY).left(pageX);
      return $('body').mousedown(this.close);
    };

    Color.prototype.close = function(event) {
      this.div.display('none');
      return $('body').off('click', this.close);
    };

    Color.prototype.changeHue = function(event) {
      return log(event);
    };

    Color.prototype.changeSaturation = function(event) {
      return log(event);
    };

    Color.prototype.changeOpacity = function(event) {
      return log(event);
    };

    return Color;

  })();

}).call(this);

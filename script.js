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
        this.canvas = $('<canvas>').position('absolute').width(window.width).attr('width', window.width).height(window.height).attr('height', window.height).mousedown('left', this.mousedown).touchstart(this.mousedown).mousemove(this.mousemove).touchmove(this.mousemove).mouseup(this.mouseup).touchend(this.mouseup).contextmenu(this.contextmenu).appendTo('body');
        this.color = new Color;
        this.context = this.canvas.context2d();
      }

      _Class.prototype.contextmenu = function(event) {
        event.preventDefault();
        if (this.color.isOpen) {
          return this.color.close();
        } else {
          return this.color.open(event);
        }
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
      this.hue = $("<div>").width(20).height(256).float('left').background('url(colorPicker/hue.png)').mousedown(this.changeHue).mousemove(this.changeHue).appendTo(this.div);
      this.saturation = $("<div>").width(256).height(256).float('left').background('url(colorPicker/saturation.png)').mousedown(this.changeSaturation).mousemove(this.changeSaturation).appendTo(this.div);
      this.opacity = $("<div>").width(20).height(256).float('left').background('url(colorPicker/opacity.png)').mousedown(this.changeOpacity).mousemove(this.changeOpacity).appendTo(this.div);
    }

    Color.prototype.open = function(_arg) {
      var pageX, pageY;
      pageX = _arg.pageX, pageY = _arg.pageY;
      this.div.display('block').top(pageY).left(pageX);
      $('body').mousedown('left', this.close);
      return this.isOpen = true;
    };

    Color.prototype.close = function() {
      this.div.display('none');
      $('body').off('click', this.close);
      return this.isOpen = false;
    };

    Color.prototype.changeHue = function(_arg) {
      var blue, green, offsetX, offsetY, red, x;
      offsetX = _arg.offsetX, offsetY = _arg.offsetY;
      x = offsetY / 256;
      if (x < 1 / 3) {
        red = -3 * x + 1;
        green = 3 * x;
        blue = 0;
      } else if (x < 2 / 3) {
        red = 0;
        green = -3 * x + 2;
        blue = 3 * x - 1;
      } else {
        red = 3 * x - 2;
        green = 0;
        blue = -3 * x + 3;
      }
      this.hue = [red, green, blue];
      return this.saturation.backgroundColor(this.hue.toColorHex());
    };

    Color.prototype.changeSaturation = function(_arg) {
      var b, g, offsetX, offsetY, r, x, y, _ref;
      offsetX = _arg.offsetX, offsetY = _arg.offsetY;
      x = offsetX / 256;
      y = offsetY / 256;
      _ref = this.hue, r = _ref[0], g = _ref[1], b = _ref[2];
      r = 1 - x + r * x;
      g = 1 - x + g * x;
      b = 1 - x + b * x;
      r = r * (1 - y);
      g = g * (1 - y);
      return b = b * (1 - y);
    };

    Color.prototype.changeOpacity = function(_arg) {
      var offsetX, offsetY;
      offsetX = _arg.offsetX, offsetY = _arg.offsetY;
    };

    return Color;

  })();

}).call(this);

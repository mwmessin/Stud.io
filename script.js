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
        var a, b, g, r, _ref;
        _ref = this.color.selectedColor, r = _ref[0], g = _ref[1], b = _ref[2], a = _ref[3];
        this.context.strokeStyle = "rgba(" + (r * 255 | 0) + "," + (g * 255 | 0) + "," + (b * 255 | 0) + "," + a + ")";
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
      this.selectedColor = [1, 1, 1, 1];
      this.div = $("<div>").position('absolute').display('none').width(296).height(256).background('black').appendTo('body');
      this.hue = $("<div>").width(20).height(256).float('left').cursor('crosshair').background('url(colorPicker/hue.png)').mousedown(this.changeHue).mousemove((function(_this) {
        return function(event) {
          if (window.dragging) {
            return _this.changeHue(event);
          }
        };
      })(this)).appendTo(this.div);
      this.saturation = $("<div>").width(256).height(256).float('left').cursor('crosshair').background('url(colorPicker/saturation.png)').mousedown(this.changeSaturation).mousemove((function(_this) {
        return function(event) {
          if (window.dragging) {
            return _this.changeSaturation(event);
          }
        };
      })(this)).appendTo(this.div);
      this.opacity = $("<div>").width(20).height(256).float('left').cursor('crosshair').background('url(colorPicker/opacity.png)').mousedown(this.changeOpacity).mousemove((function(_this) {
        return function(event) {
          if (window.dragging) {
            return _this.changeOpacity(event);
          }
        };
      })(this)).appendTo(this.div);
    }

    Color.prototype.open = function(_arg) {
      var pageX, pageY;
      pageX = _arg.pageX, pageY = _arg.pageY;
      this.isOpen = true;
      return this.div.display('block').top(pageY).left(pageX);
    };

    Color.prototype.close = function() {
      this.isOpen = false;
      return this.div.display('none');
    };

    Color.prototype.changeHue = function(_arg) {
      var b, g, offsetY, r, y;
      offsetY = _arg.offsetY;
      y = offsetY / 256;
      if (y < 1 / 3) {
        r = ((-3 * y + 1) * 2).min(1);
        g = ((3 * y) * 2).min(1);
        b = 0;
      } else if (y < 2 / 3) {
        r = 0;
        g = ((-3 * y + 2) * 2).min(1);
        b = ((3 * y - 1) * 2).min(1);
      } else {
        r = ((3 * y - 2) * 2).min(1);
        g = 0;
        b = ((-3 * y + 3) * 2).min(1);
      }
      this.selectedHue = [r, g, b];
      this.selectedColor = [r, g, b, 1];
      return this.saturation.backgroundColor(this.selectedHue.toColorHex());
    };

    Color.prototype.changeSaturation = function(_arg) {
      var b, g, offsetX, offsetY, r, x, y, _ref;
      offsetX = _arg.offsetX, offsetY = _arg.offsetY;
      x = offsetX / 256;
      y = offsetY / 256;
      _ref = this.selectedHue, r = _ref[0], g = _ref[1], b = _ref[2];
      r = 1 - x + r * x;
      g = 1 - x + g * x;
      b = 1 - x + b * x;
      r = r * (1 - y);
      g = g * (1 - y);
      b = b * (1 - y);
      this.selectedSaturation = [r, g, b];
      this.selectedColor = [r, g, b, 1];
      return this.opacity.backgroundColor(this.selectedSaturation.toColorHex());
    };

    Color.prototype.changeOpacity = function(_arg) {
      var b, g, offsetY, r, y, _ref;
      offsetY = _arg.offsetY;
      y = offsetY / 256;
      _ref = this.selectedSaturation, r = _ref[0], g = _ref[1], b = _ref[2];
      return this.selectedColor = [r, g, b, 1 - y];
    };

    return Color;

  })();

}).call(this);

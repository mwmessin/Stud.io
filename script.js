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
        this.canvas = $("<canvas>").width(window.width).attr('width', window.width).height(window.height).attr('height', window.height).mousedown(this.mousedown).touchstart(this.mousedown).mousemove(this.mousemove).touchmove(this.mousemove).mouseup(this.mouseup).touchend(this.mouseup).contextmenu(this.contextmenu).appendTo("body");
        debugger;
        this.context = this.canvas.context2d();
      }

      _Class.prototype.contextmenu = function(event) {
        event.preventDefault();
        return false;
      };

      _Class.prototype.mousedown = function(event) {
        var pageX, pageY, touch, touches;
        event.preventDefault();
        pageX = event.pageX, pageY = event.pageY, touches = event.touches;
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

  $(function() {
    var Color;
    return Color = (function() {
      function Color() {
        this.opacity = __bind(this.opacity, this);
        this.hue = __bind(this.hue, this);
        this.toggle = __bind(this.toggle, this);
        this.div = $("<div>", {
          css: {
            position: "absolute",
            cursor: "default",
            fontSize: "5em",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0"
          }
        }).appendTo("body");
        $('body').contextmenu(this.toggle);
      }

      Color.prototype.toggle = function(event) {
        console.log('hey');
        return event.preventDefault();
      };

      Color.prototype.hue = function(event) {};

      Color.prototype.opacity = function(event) {};

      return Color;

    })();
  });

}).call(this);

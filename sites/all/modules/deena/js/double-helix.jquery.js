(function($, Drupal) {
    Drupal.attachBehaviors = function(context, settings){
        context = context || document;
        settings = settings || Drupal.settings;
        $(window).ready(function() {
        	var canvas = $("<canvas />");
            $.fn.DoubleHelix = function(options) {
                var settings = {
                  fps: 75,
                  fgColor: "0,100,255",
                  bgColor: "transparent"
                }
                if (options) { settings = $.extend(settings, options);}
                var calculator = function(c, dim, t, y) {
                    var x1 = 0, x2 = 0, z1 = 0, z2 = 0;
                    var drawShape = function(x, y, opacity) {
                        c.fillStyle = "rgba("+settings.fgColor+","+opacity+")";
                        c.beginPath();
                        c.arc(x+5, y+5, 5, 0, Math.PI*2, true);
                        c.closePath();
                        c.fill();
                    }
                    var drawLine = function(y, x1, x2, z1, z2) {
                        c.beginPath();
                        c.moveTo(x1+5, y+5);
                        c.lineTo(x2+5, y+5);
                        var g = c.createLinearGradient(x1, y, x2, y);
                        g.addColorStop(0, "rgba("+settings.fgColor+","+z1+")");
                        g.addColorStop(1, "rgba("+settings.fgColor+","+z2+")");
                        c.strokeStyle = g;
                        c.stroke();
                    }
                    var fix = function(n) {return Math.round(n*10)/10;}
                    return {
                        calculate: function() {
                            t+=0.25;
                            x1 = Math.cos(t/360 * (Math.PI*2));
                            x2 = Math.sin((t+270)/360 * (Math.PI*2));
                            z1 = Math.cos((t+90)/360 * (Math.PI*2));
                            z2 = Math.sin((t+360)/360 * (Math.PI*2));
                        },
                        draw: function() {
                            var _x1 = fix((x1*(dim.halfWidth-5))+dim.halfWidth-5);
                            var _x2 = fix((x2*(dim.halfWidth-5))+dim.halfWidth-5);
                            var _z1 = (z1+1)/2;
                            var _z2 = (z2+1)/2;

                            if ( _x1 != 45) { drawLine(y, _x1, _x2, _z1, _z2); }

                            drawShape(_x1, y, _z1);
                            drawShape(_x2, y, _z2);
                        }
                    }
                }

                return this.each(function(i) {
                    var c = this.getContext('2d');
                    var dim = {
                        width: c.canvas.width,
                        height: c.canvas.height,
                        halfHeight: c.canvas.height/2,
                        halfWidth: c.canvas.width/2
                    }
                    var buffer = document.createElement('canvas');
                    buffer.setAttribute('width', dim.width);
                    buffer.setAttribute('height', 180);
                    var cb = buffer.getContext('2d');
                    var calculators = [];
                    for (n = 0; n < 9; n++) {
                        var calc = new calculator(cb, dim, n*20, n*20);
                        calculators[n] = calc;
                    }
                    var copies = dim.height > 180 ? Math.ceil(dim.height/180) : 1;
                    var now, delta;
                    var then = Date.now();
                    var interval = 1000/settings.fps;
                    var draw = function() {
                        requestAnimationFrame(draw);
                        now = Date.now();
                        delta = now - then;
                        if (delta >= interval) {
                            cb.clearRect(0, 0, dim.width, dim.height);
                            cb.fillStyle = settings.bgColor;
                            cb.fillRect(0, 0, dim.width, dim.height);
                            $.each(calculators, function(i, calc) {
                                calc.calculate();
                                calc.draw();
                            });
                            c.clearRect(0, 0, dim.width, dim.height);
                            for (var n = 0; n < copies; n++) {
                                c.drawImage(buffer, 0, n*180);
                            }
                            then = now - (delta % interval);
                        }
                    }
                    draw();
                });
        	}
        	canvas.attr({ width: 400, height: $(document).height()/2 });
        	$("#demo").append(canvas);
        	canvas.DoubleHelix();
        });
    }
})(jQuery, Drupal);

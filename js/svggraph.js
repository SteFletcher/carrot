function loadSVGBarChart() {

    $.fn.svgBarGraph = function(options) {
        _calcFinalDrop = function(array, height) {
            return (height - array[array.length - 1].y);
        }
        var defaults = {
            width: 100,
            height: 100,
            graduationX: 10,
            graduationY: 10,
            plotPoints: [{
                //start time
                x: 0,
                // event id
                y: 100
            }]
        };
        var _options = $.extend(defaults, options),
            _this = this;
        _options.numberOfVertGridLines = (_options.width / _options.graduationX);
        _options.numberOfHorizGridLines = (_options.height / _options.graduationY) + 1;
        _options.finalDrop = _calcFinalDrop(_options.plotPoints, _options.height)
        console.log(_options);
        $.get('/svggraph.htm',
            function(data, status) {
                var renderer = Handlebars.compile(data);
                console.log(_options);
                var result = renderer(_options);
                _this.html(result);
                var hoverWidget = _this.find('#hoverWidget');
                // add click handlers to points
                hoverWidget.show();
                _this.mousemove(function(event) {
                    hoverWidget.attr({
                        'cx': event.clientX
                    });
                });
            });


    }
}
function loadSVGBarChart() {

    $.fn.svgBarGraph = function(options) {
        _calcFinalDrop = function(array, height) {
            return (height - array[array.length - 1].y);
        }
        var defaults = {
            width: 100,
            height: 100,
            graduationX: 5,
            graduationY: 10,
            xlabels: [],
            ylabels: [],
            plotPoints: [{
                //start time
                x: 0,
                // event id / URI
                y: 100,
                // x + y = the object key if key is null
                objectKey: null,
                //objectData to be displayed on hover
                objectData: "null"
            }]
        };

        var _options = $.extend(defaults, options),
            _this = this;

        // set fontSize to be used for y-axis offset allowing labels to display
        if(_options.labelSize === undefined){            
            var fontSize = $(document.body).css('font-size');
            fontSize = fontSize.substring(0, fontSize.length-2);
            _options.labelSize = eval(fontSize);
        }

        // create x axis labels based on graduation
        for (var i = 0; i <= (_options.width/_options.graduationX); i++) {
            _options.xlabels.push(_options.graduationX*i);
        }

        // create y axis labels
        for (var i = 0; i <= (_options.height/_options.graduationY); i++) {
            _options.ylabels.push(_options.graduationY*i);
        }

        _options.totalHeight = _options.height + _options.labelSize;
        _options.numberOfVertGridLines = (_options.width / _options.graduationX) * 2;
        _options.numberOfHorizGridLines = (_options.height / _options.graduationY) + 1;
        _options.finalDrop = _calcFinalDrop(_options.plotPoints, _options.height);
        console.log(_options);
        $.get('/svggraph.htm',
            function(data, status) {
                var renderer = Handlebars.compile(data);
                console.log(_options);
                var result = renderer(_options);
                _this.html(result);

                // var hoverWidget = _this.find('#hoverWidget');
                // // add click handlers to points
                // hoverWidget.show();
                // _this.mousemove(function(event) {
                //     hoverWidget.attr({
                //         'cx': event.clientX
                //     });
                // });
            }).then(function(){
                var $chart_popup  = $('#chart_popup');
                $chart_popup.hide();
                $('.gpoint circle').on('mouseover', function(event){
                    console.log("event.target.id");
                    $chart_popup.css({
                        position: 'fixed',
                        left: event.clientX,
                        top: event.clientY
                    }).show();
                    
                }).on('mouseout', function(event){
                    $chart_popup.hide();
                });
            });


    }
}
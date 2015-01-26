function count(obj) {

    if (obj.__count__ !== undefined) { // Old FF
        return obj.__count__;
    }

    if (Object.keys) { // ES5 
        return Object.keys(obj).length;
    }

    // Everything else:
    var c = 0, p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            c += 1;
        }
    }

    return c;

}

$(document).ready(function() {
    registerHandlebarsHelpers();
    var _console = window.console;
    if (_console === undefined) {
        window.prototype.console = function() {
            this.log = function(msg) {};
        }
    }
});

$(document).ready(function() {
    var bodyWidth = $(document.body).width() * 0.9;
    loadSVGBarChart();
    $('#svgchart').svgBarGraph({
        "plotPoints" : [{x:10, y:14},{x:150, y:30},{x:200, y:90}, {x:400, y:20}],
        graduationX: 200,
        graduationY: 50,
        width: bodyWidth,
        height: 100
    });

    //loadResults();
    //$('#results_table').resultsTable({dataFolder:'/data/'});
});


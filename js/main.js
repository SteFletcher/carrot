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
    // $('#track1_container').audioWidget({
    //     trackUri: './audio/dollar.mp3',
    //     title: 'Alo Bloc - Dollar'
    // });
    loadSVGBarChart();

    $('#svgchart').svgBarGraph({
        width: 400,
        height: 100,
        graduationX: 50,
        graduationY: 50,
        plotPoints: [{
            x: 0,
            y: 100
        }, {
            x: 50,
            y: 10
        }, {
            x: 100,
            y: 10
        }, {
            x: 230,
            y: 50
        }]
    });
});
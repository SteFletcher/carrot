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
    // $('#track1_container').audioWidget({
    //     trackUri: './audio/dollar.mp3',
    //     title: 'Alo Bloc - Dollar'
    // });
    //loadSVGBarChart();

    loadResults();
    $('#results_table').resultsTable({uri:'/data/results.json'});
});


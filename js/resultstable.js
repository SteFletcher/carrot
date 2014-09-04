function loadResults() {

    $.fn.resultsTable = function(options) {
        var defaults = {};
        var _options = $.extend(defaults, options);
        var _this = this;

        $.getJSON( options.uri, function( data ) {
        });
        
        $.get('/results_template.htm',
            function(data, status) {
                debugger;
                var renderer = Handlebars.compile(data);
                console.log(_options);
                var result = renderer(_options);
                _this.html(result);
        });
    }
}
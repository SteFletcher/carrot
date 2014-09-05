function loadResults() {

    $.fn.resultsTable = function(options) {
        var defaults = {};
        var _options = $.extend(defaults, options);
        var _this = this;
            // $.get('/results_template.htm',
            //     function(data2, status) {
            //         var renderer = Handlebars.compile(data2);
            //         console.log(data2);
            //         var result = renderer(data2);
            //         _this.html(result);

            //         $.getJSON( options.uri, function( data ) {
            //             console.log(data);
            //         });
                    
            // });
            var frag = {template: null, data: null};
debugger
            $.when(
                    $.getJSON( options.uri, function( data ) {
                        console.log(data);
                        frag.data = data;
                    }),
                    $.get('/results_template.htm',
                        function(data, status) {
                            frag.template = data;                        
                    })
                ).then(function(){
                    console.log(frag);
                    var renderer = Handlebars.compile(frag.template);
                    var result = renderer(frag.data);
                    _this.html(result);
                });
    }
}
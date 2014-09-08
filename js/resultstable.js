function loadResults() {

    $.fn.resultsTable = function(options) {
        var defaults = {};
        var _options = $.extend(defaults, options);
        var _this = this;
            var frag = {template: null, data: null};
            $.when(
                    $.getJSON( options.uri, function( data ) {
                        console.log(data);
                        frag.data = data;
                    }).fail(function(jqXHR, textStatus, errorThrown){console.log("failed:"+errorThrown)}),
                    $.get('/results_template.htm',
                        function(data, status) {
                            frag.template = data;                        
                    })
                ).done(function(){
                    console.log(frag);
                    var renderer = Handlebars.compile(frag.template);
                    var result = renderer(frag.data);
                    _this.html(result);
                }).then(function(){
                    $(_this).find('table').tablesorter();
                });
    }
}
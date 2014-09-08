function loadResults() {

    $.fn.resultsTable = function(options) {
        var defaults = {};
        var _options = $.extend(defaults, options);
        var _this = this;
        var frag = {template: null, data: null};

        var loadSelector = function(){
                $.get('/result_selector.htm',
                    function(data, status) {
                        frag.template = data;                        
                }).done(function(){                    
                    var renderer = Handlebars.compile(frag.template);
                    var result = renderer('');
                    _this.append(result);
                }).then(function(){
                    $(_this).find('.perf_stat_selector').change(function(){                      
                    $(_this).find("option:selected" ).each(function() {
                            console.log($(this).text());
                            $(_this).find('#results_container').remove();
                            //$(_this).resultsTable({uri: '/data/'+$(this).text()+'.json', selected:$(this).text()});

                            console.log(_options.dataFolder +$(this).text()+'.json');
                            loadTable(_options.dataFolder, '/'+$(this).text()+'.json');
                        });
                    });
                });
        }     

        var loadTable = function(dataFolder, jsonfilename){
            console.log(dataFolder);
            console.log(jsonfilename);
            console.log(dataFolder + jsonfilename);
            $.when(
                $.getJSON( dataFolder + jsonfilename, function( data ) {
                    frag.data = data;
                }).fail(function(jqXHR, textStatus, errorThrown){console.log("failed:"+errorThrown)}),
                $.get('/results_template.htm',
                    function(data, status) {
                        frag.template = data;                        
                })
            ).done(function(){
                var renderer = Handlebars.compile(frag.template);
                var result = renderer(frag.data);
                _this.append(result);
            }).then(function(){
                $(_this).find('table').tablesorter();
                

            });
        }
        loadSelector(_options);
        loadTable(_options);
    }
}
function pad(number){
      if (number<10){
        return '0'+number;
      }else return number+'';
    }
function loadResults() {



    $.fn.resultsTable = function(options) {
        var defaults = {};
        var _options = $.extend(defaults, options);
        var _this = this;
        var frag = {template: null, data: null};
        var selector = {template: null, data: null};
        _this.allData = {};
        var loadData = function(data){
            data.data.resultFiles.forEach(function(item){
                console.log(item);
                    var tmp = {}
                    _this.allData[item] = tmp;
                $.getJSON( _options.dataFolder + item, function( data ) {
                    data.results.forEach(function(result){
                        tmp[result.uniqueURI] = result;
                    });
                    
                    
                }).fail(function(jqXHR, textStatus, errorThrown){
                    console.log("failed:"+errorThrown);
                })
            });
        };

        var loadSelector = function(){

                $.when(
                    $.get('/result_selector.htm',
                        function(data, status) {
                            selector.template = data;                        
                        }),
                        $.getJSON( _options.dataFolder + '/selectorItems.json', function( data ) {
                            selector.data = data;
                        }).fail(function(jqXHR, textStatus, errorThrown){
                                console.log("failed:"+errorThrown)
                        })
                    
                ).done(function(){                    
                    var renderer = Handlebars.compile(selector.template);
                    var result = renderer(selector.data);
                    _this.append(result);

                }).then(function(){
                    $(_this).find('.perf_stat_selector').change(function(){                      
                        $(_this).find("option:selected" ).each(function() {
                            console.log($(this).text());
                            $(_this).find('#results_container').remove();
                            console.log(_options.dataFolder +$(this).text());
                            loadTable(_options.dataFolder, ''+$(this).text());
                        });
                        debugger;
                    });
                }).then(function(){     
                        var today = new Date();
                        var yesterDaysResults = pad((today.getDate()-1)) + "-" + pad((today.getMonth() +1)) + "-" + today.getFullYear()+".json";
                        $('.perf_stat_selector option[value='+'"'+yesterDaysResults+'"'+']').prop('selected',true);
                        $('.perf_stat_selector').change();
                            // load data for trend analysis
                        loadData(selector);
                     }
                );
        }     

        var loadTable = function(dataFolder, jsonfilename){
            $.when(
                $.getJSON( dataFolder + jsonfilename, function( data ) {
                    frag.data = data;
                }).fail(function(jqXHR, textStatus, errorThrown){
                    console.log("failed:"+errorThrown)
                }),
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
    }


}
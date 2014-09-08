function registerHandlebarsHelpers() {
    //handlebars helper to do simple math  
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });


    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper("calcCircum", function(radius, options) {
        radius = parseFloat(radius);
        return 2 * Math.PI * radius;
    });

    Handlebars.registerHelper("toSeconds", function(microseconds) {
        microseconds = microseconds/1000000;
        // return microseconds;
        return numeral(microseconds).format('0,0.000')+'s';
    });

    Handlebars.registerHelper("toKiloBytes", function(bytes) {
        bytes = bytes/1000;
        // return bytes;
        return numeral(bytes).format('0,0.00')+'KB';
    });
}
var fs = require('fs');
var d3 = require('d3');
var jsdom = require('jsdom');

var chartWidth = 500, chartHeight = 500;


module.exports = function(data, outputLocation) {

	if(!data) data = [12,31];
	if(!outputLocation) outputLocation = 'test.svg';

    function main(err, window) {

        window.d3 = d3.select(window.document);

        var svg = window.d3.select('body')
            .append('div').attr('class', 'container')
            .append('svg')
                .attr({
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: chartWidth,
                    height: chartHeight
                })
            .append('g')
                .attr('transform', 'translate(' 
                            + chartWidth/2 + ',' + chartWidth/2 + ')');


        fs.writeFileSync(outputLocation, window.d3.select('.container').html());

    }

    jsdom.env({ html: '', features: { QuerySelector: true }, done: main});
}

if (require.main === module) {
    module.exports();
}

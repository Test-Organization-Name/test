var fs = require('fs');
var d3 = require('d3');
var pg = require('pg');
var jsdom = require('jsdom');

var connectString = 'postgres://vagrant:vagrant@localhost/world';
var outputLocation = 'test.svg';
    

jsdom.env({ html: '', features: { QuerySelector: true }, done: main });

function main(err, window) {
    
    pg.connect(connectString, function(err, client, done) {

        var sql = 'SELECT * FROM city c LEFT JOIN country co ON co.capital = c.id LEFT JOIN countrylanguage cl ON cl.countrycode = co.code WHERE 1=1 LIMIT 5;';

        done();

        client.query(sql, function(err, result) {

            if (err) {
                console.log(err);
            }

            var svg = createChart(result.rows, window);

            console.log('writing to file...');
            fs.writeFile(outputLocation, svg, function(err, data) {
                if (err) {
                    console.log(err);
                }
                console.log('Complete!');
            });

        });
    });

}

function createChart(data, window) {

    console.log('creating chart...');

    var width = 200, 
        height = 200;


    window.d3 = d3.select(window.document);
    var svg = window.d3.select('body')
        .append('div').classed('container', true)
        .append('svg')
            .attr({
                xmlns: 'http://www.w3.org/2000/svg',
                width: width,
                height: height
            }) 
        .append('g')
            .attr('transform', 'translate(' + width/2 + ',' + width/2 + ')');

    console.log(data);

    return window.d3.select('.container').html();

}

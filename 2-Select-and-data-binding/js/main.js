const data = [25, 20, 15, 10, 5];
const width = 40;
const spacing = 20;
const offset = 100;

let svg = d3.select('#chart-area').append('svg').attr('width', 400).attr('height', 400);
let rectangles = svg.selectAll('rect').data(data);

rectangles.enter().append('rect')
    .attr('x', (_, i) => { return i * (width + spacing); })
    .attr('y', (d) => { return 100 - d; }) // Extra: Make them to be bottom alligned.
    .attr('width', width)
    .attr('height', (d) => { return d; })
    .attr('fill', 'red');
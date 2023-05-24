let svg = d3.select('#chart-area').append('svg').attr('width', 800).attr('height', 800);

const width = 50;
const spacing = 20;

d3.json('data/buildings.json').then((data)=> {
	data.forEach((d) => { d.height = parseInt(d.height); });

	let buildings = svg.selectAll('rect').data(data);
        
    buildings.enter().append('rect')
        .attr('x', (_, i) => { return i * (width + spacing); })
        .attr('y', (d) => { return 800 - d.height; })
        .attr('width', width)
        .attr('height', (d) => { return d.height; })
        .attr('fill', 'blue');
});
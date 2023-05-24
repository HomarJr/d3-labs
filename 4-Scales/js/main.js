let svg = d3.select('#chart-area').append('svg').attr('width', 500).attr('height', 500);

const min = 0;
const max = 400;
const padding = 0.3;

d3.json('data/buildings.json').then((data)=> {
	data.forEach((d) => { d.height = parseInt(d.height); });

    let buildingsList = data.map((d) => { return d.name; } );
    let maxHeight = d3.max(data, (d) => { return d.height; });

    let x = d3.scaleBand()
        .domain(buildingsList)
        .range([min, max])
        .paddingInner(padding)
        .paddingOuter(padding);

    let y = d3.scaleLinear()
        .domain([0, maxHeight])
        .range([min, max]);

    let color = d3.scaleOrdinal()
        .domain(buildingsList)
        .range(d3.schemeSet3);

	let buildings = svg.selectAll('rect').data(data);
        
    buildings.enter().append('rect')
        .attr('x', (d) => { return x(d.name); })
        .attr('y', (d) => { return 500 - y(d.height); })
        .attr('width', x.bandwidth())
        .attr('height', (d) => { return y(d.height); })
        .attr('fill', (d) => { return color(d.name); })
});
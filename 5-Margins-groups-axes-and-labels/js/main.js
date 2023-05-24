const canvas_width = 600;
const canvas_height = 400;

const min = 0;
const max = 400;
const padding = 0.3;

const margin = { left: 100, right: 10, top: 10, bottom: 100 };

let canvas = d3.select('#chart-area').append('svg')
    .attr('width', canvas_width + margin.right + margin.left)
    .attr('height', canvas_height + margin.top + margin.bottom);
let group = canvas.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

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
        .range([max, min]);

    let color = d3.scaleOrdinal()
        .domain(buildingsList)
        .range(d3.schemeSet3);

	let buildings = group.selectAll('rect').data(data);
        
    buildings.enter().append('rect')
        .attr('x', (d) => { return x(d.name); })
        .attr('y', (d) => { return y(d.height); })
        .attr('width', x.bandwidth())
        .attr('height', (d) => { return max - y(d.height); })
        .attr('fill', (d) => { return color(d.name); });

    let bottomAxis = d3.axisBottom(x);

    group.append('g')
        .attr('class', 'bottom axis')
        .attr('transform', `translate(0, ${max})`)
            .call(bottomAxis)
            .selectAll('text')
                .attr('y', '10')
                .attr('x', '-5')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-20)');
    
    let leftAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat((d) => { return d + 'm'; });

    group.append('g')
        .attr('class', 'left axis')
        .call(leftAxis);

    group.append('text')
        .attr('class', 'x axis-label')
        .attr('x', canvas_width / 2)
        .attr('y', canvas_height + 140)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(-120, -50)')
        .text('The word's tallest buildings');

    group.append('text')
        .attr('class', 'y axis-label')
        .attr('x', -(canvas_height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Height (m)');
});
const canvas_width = 600;
const canvas_height = 400;

const min = 0;
const max = 400;
const padding = 0.3;

const ticks = 11;
const prepend_label = '$';
const append_label = 'K';
const scale = 1/1000;
const x_axis_label = 'Month';
const y_axis_label_1 = 'Revenue (dlls.)';
const y_axis_label_2 = 'Profit (dlls.)';

const margin = { left: 100, right: 10, top: 10, bottom: 100 };

let canvas = d3.select('#chart-area').append('svg')
    .attr('width', canvas_width + margin.right + margin.left)
    .attr('height', canvas_height + margin.top + margin.bottom);
let group = canvas.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
let x = d3.scaleBand()
    .range([min, max])
    .paddingInner(padding)
    .paddingOuter(padding);
let y = d3.scaleLinear()
    .range([max, min]);
let groupX = group.append('g')
    .attr('class', 'bottom axis')
    .attr('transform', `translate(0, ${canvas_height})`)
let groupY = group.append('g')
    .attr('class', 'left axis')
let labelX = group.append('text')
    .attr('class', 'x axis-label')
    .attr('x', canvas_width / 2)
    .attr('y', canvas_height + 140)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(-120, -50)')
    .text(x_axis_label);
let labelY = group.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(canvas_height / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')    

let flag = true;


d3.json('data/revenues.json').then((data)=> {
	data.forEach((d) => {
        d.revenue = parseInt(d.revenue);
        d.profit = parseInt(d.profit);
    });
    d3.interval(() => {
        update(data);
        flag = !flag;
    }, 1000);

}).catch((errorMessage) => { console.error(errorMessage); });

function update(data) {
    let dataKey = flag ? "revenue" : "profit";

    x.domain(data.map((d) => { return d.month; } ));
    y.domain([min, d3.max(data, (d) => { return d[dataKey]; })]);

    let bottomAxis = d3.axisBottom(x);
    groupX.call(bottomAxis)
        .selectAll('text')
            .attr('y', '10')
            .attr('x', '-5')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-20)');

    let leftAxis = d3.axisLeft(y)
        .ticks(ticks)
        .tickFormat((d) => { return `${prepend_label}${d*scale}${append_label}`; });
    groupY.call(leftAxis);

    let label = flag ? y_axis_label_1 : y_axis_label_2;
    labelY.text(label);

    let months = group.selectAll('rect').data(data);
    months.exit().remove();
    months
        .attr('x', (d) => { return x(d.month); })
        .attr('y', (d) => { return y(d[dataKey]); })
        .attr('width', x.bandwidth())
        .attr('height', (d) => { return canvas_height - y(d[dataKey]); });
    months.enter().append("rect")
        .attr('x', (d) => { return x(d.month); })
        .attr('y', (d) => { return y(d[dataKey]); })
        .attr('width', x.bandwidth())
        .attr('height', (d) => { return canvas_height - y(d[dataKey]); })
        .attr('fill', 'yellow');
}
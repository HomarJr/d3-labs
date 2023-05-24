let svg = d3.select('#chart-area').append('svg').attr('width', 400).attr('height', 400);

const spacing = 50;
const margin = 100

d3.json('data/ages.json').then((data)=> {
    data.forEach((d) => { d.age = parseInt(d.age); });

    let circles = svg.selectAll('circle').data(data);

    circles.enter().append('circle')
            .attr('cx', (_, i) => { return (i * spacing) + margin; })
            .attr('cy', margin)
            .attr('r', (d) => { return d.age; })
            .attr('fill', (d) => { return d.age > 10 ? 'green' : 'blue'; }); // Extra: Make the circles have different color for those above 10.

}).catch((errorMessage) => {
    console.error(errorMessage);
});
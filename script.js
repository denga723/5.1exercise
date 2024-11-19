// Select the SVG canvas
const svg = d3.select('#svg-canvas');

// Add SVG Filters
const defs = svg.append('defs');

// Blur Filter
defs.append('filter')
  .attr('id', 'blur')
  .append('feGaussianBlur')
  .attr('stdDeviation', 5);

// Shadow Filter
defs.append('filter')
  .attr('id', 'shadow')
  .append('feDropShadow')
  .attr('dx', 5)
  .attr('dy', 5)
  .attr('stdDeviation', 3)
  .attr('flood-color', '#888');

// Data for circles
const data = [
  { cx: 100, cy: 100, r: 50, color: 'red' },
  { cx: 300, cy: 200, r: 70, color: 'blue' },
  { cx: 500, cy: 100, r: 40, color: 'green' }
];

// Append circles
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', d => d.r)
  .attr('fill', d => d.color)
  .attr('filter', 'url(#blur)')
  .on('mouseover', function (e, d) {
    d3.select(this)
      .attr('fill', 'gold')
      .attr('filter', 'url(#shadow)')
      .transition()
      .duration(200)
      .attr('r', d.r * 1.2);
  })
  .on('mouseout', function (e, d) {
    d3.select(this)
      .attr('fill', d.color)
      .attr('filter', 'url(#blur)')
      .transition()
      .duration(200)
      .attr('r', d.r);
  })
  .on('click', function (e, d) {
    d3.select(this)
      .transition()
      .duration(500)
      .attr('cx', Math.random() * 800)
      .attr('cy', Math.random() * 600);
  });

// Append dynamic rectangles
svg.selectAll('rect')
  .data([1, 2, 3])
  .enter()
  .append('rect')
  .attr('x', (d, i) => 150 * i + 100)
  .attr('y', 400)
  .attr('width', 100)
  .attr('height', 50)
  .attr('fill', 'purple')
  .attr('filter', 'url(#shadow)')
  .on('click', function () {
    d3.select(this).transition().duration(300).attr('fill', 'pink');
  });

// Animated lines
svg.append('line')
  .attr('x1', 0)
  .attr('y1', 300)
  .attr('x2', 800)
  .attr('y2', 300)
  .attr('stroke', '#000')
  .attr('class', 'line');

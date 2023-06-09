// set the dimensions and margins of the graph
const margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 860 - margin.left - margin.right,
    height = 760 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.max(width, height) /9   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
const svg = d3.select("#state_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${width/2+margin.left}, ${height/2+margin.top})`);

d3.json("https://api.covidtracking.com/v1/states/current.json").then( function(data) {

  // Scales
  const x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(d => d.state)); // The domain of the X axis is the list of states.
  const y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .join("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(d => y(d['positive']))
          .startAngle(d => x(d.state))
          .endAngle(d => x(d.state) + x.bandwidth())
          .padAngle(0.03)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
        .attr("text-anchor", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['positive'])+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.state)})
        .attr("transform", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

});


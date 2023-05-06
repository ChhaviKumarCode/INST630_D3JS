// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1400 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#Mline_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("daily_state.csv").then( function(data) {
  console.log("check data", data)
  // group the data: I want to draw one line per group
  const sumstat = d3.group(data, d => d.state); // nest function allows to group the calculation per level of a factor

  // Add X axis --> it is a date format
  const x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.positive; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  const color = d3.scaleOrdinal()
  .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .join("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d[0]) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(+d.positive); })
            (d[1])
        })
})

//.range(['#e41a1c', '#E1CC4F', '#B32428','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999','#B44C43','#424632','#1B5583', '#B8B799', '#7F7679', '#00BB2D', '#9D9101','#4A192C','#705335','#633A34', '#FF7514', '#E63244', '#BDECB6', '#3F888F', '#FAD201','#EA899A','#6C7059', '#C1876B','#641C34', '#4C2F27', '#8673A1', '#1F3A3D', '#31372B',' #282828','#6C6874','#5D9B9B', '#287233','#A12312','#4C9141', '#D36E70', '#8A9597','#6D3F5B','#606E8C','#FF2301','#4D5645','#7D7F7D','#EFA94A','#FFFF00','#692944','#DE4C8A,'#1500ff','#9500ff'])

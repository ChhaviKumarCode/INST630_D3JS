// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#line_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("bar.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%m/%d/%y")(d.date), positive : d.positive, death : d.death }
  }).then(

  // use this dataset:
  function(data) {

        // X axis
        x.domain(data.map(d => d.date));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
    
        // Add Y axis
        y.domain([0, d3.max(data, d => +d[positive]) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
        // variable u: map data to existing bars
        const u = svg.selectAll("rect")
          .data(data)
    
        // update bars
        u.join("rect")
          .transition()
          .duration(1000)
            .attr("x", d => x(d.date))
            .attr("y", d => y(d[positive]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[positive]))
            .attr("fill", "#69b3a2")
      })
    
    
    
    // Initialize plot
    update('positive')
  
    
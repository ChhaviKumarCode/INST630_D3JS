const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 1400 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#hosp_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("covid_og.csv").then( function(data) {


// convert the date into a javascript format
data.forEach(d => {
  d.data = `${d.date.toString().substring(0, 4)}-${d.date.toString().substring(4, 6)}-${d.date.toString().substring(6, 8)}`;
});


// X axis
const x = d3.scaleBand()
.range([ 0, width ])
.domain(data.map(d => d.date))
.padding(0.2);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");


//

// Add Y axis
const y = d3.scaleLinear()
.domain([0, 900000])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
.data(data)
.join("rect")
.attr("x", d => x(d.date))
.attr("y", d => y(d.hospitalized))
.attr("width", x.bandwidth())
.attr("height", d => height - y(d.hospitalized))
.attr("fill", "#F4D03F")

})
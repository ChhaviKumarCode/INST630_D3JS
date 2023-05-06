async function fetchData() {
    const url = "https://api.covidtracking.com/v1/us/daily.json"
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  fetchData().then(data => {
    const date = date.map(function(index){
        return index.date;
    }); // fetched date
  });

// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 1080 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.json("https://api.covidtracking.com/v1/us/daily.json").then( function(data) {

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

// Add Y axis
const y = d3.scaleLinear()
.domain([0, 30000000])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
.data(data)
.join("rect")
.attr("x", d => x(d.date))
.attr("y", d => y(d.positive))
.attr("width", x.bandwidth())
.attr("height", d => height - y(d.positive))
.attr("fill", "#69b3a2")

})
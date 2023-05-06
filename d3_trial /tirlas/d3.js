var result = d3.csv("covid.csv");
      //^it parses using a parsing lib as csv file and returns it as a list of JS objects. corresponds to rows and values of the rows.

      console.log(result);
      result.then(function (data) {
        console.log(data);
      });
function main(){
    //d3 code goes here
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("heigth") - margin,

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
    var g = svg.append("g").attr("transform", "translate("+100+","+100+")");

    d3.csv("covid.csv").then(function(data){
        xScale.domain(data.map(function(d){return d.date;}));
        yScale.domain([0, d3.max(data, function(d){return d.death;})]);
        
        g.append("g").attr('transform', 'translate(0,'+height+'0)' )
            .call(d3.axisBottom(xScale))
        g.append('g').call(d3.axisLeft(yScale));

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d){return xScale(d.date);})
        .attr("y", function(d){return yScale(d.death);})
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return heigth - yScale(d.death);});
        

    });
}
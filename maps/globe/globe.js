var margin = { top: 50, left: 50, right: 50, bottom: 50 },
  height = 500 - margin.top - margin.bottom,
  width = 1000 - margin.left - margin.right;

/*
  Create map with size variables
*/
var svg = d3
  .select("#map")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .append("g");
 // .attr("transform", "translate(" + margin.left + margin.top + ")");




//var cities = d3.csv("worldcities.csv",function(data){
  //console.log(data);
//});
console.log(typeof cities);
//console.log(cities);

/*
cities.forEach(function(d){
  console.log(cities);
});
*/

/*
var capitals = d3.csv("worldcities.csv", function(d) {
  return {
    city : +d.city,
    lat : +d.lat,
    lng : +d.lng
  };
});
*/

var cities;
d3.csv("worldcities.csv",function(data){
  cities = data;
});

console.log(cities);  

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error,data,cities) {
  if (error) throw error;

//  var cities = d3.csv("worldcities.csv"); //,function(cityData){
    //console.log(cityData);
//  });

  console.log(cities);

  var countries = topojson.feature(data, data.objects.countries).features;
  //console.log(JSON.stringify(countries, null, 2));

  var projection = d3.geoMercator()
    .scale(100)
    .center([83.96, 40]);

  var path = d3.geoPath()
    .projection(projection);

  svg
    .selectAll(".country")
    .data(countries)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill","#ccc")
    .on("mouseover",function(d){
      d3.select(this).classed("selected",true)
    })
    .on("mouseout",function(d) {
      d3.select(this).classed("selected",false)
    });

    /*
    svg.selectAll("city-circle")
      .data(capitals)
      .enter().append("circle")
      .attr("r",2)
      .attr("cx",10)
      .attr("cy",10)


      .attr("cx",function(d){
        var coords = projection([d.lat, d.lng])
        return coords[0];
      })
      .attr("cy",function(d){  
        var coords = projection([d.lat, d.lng])
        return coords[1];
      })  

      svg.selectAll(".city-label")
        .data(capitals)
        .enter()
        .append("text")
        .attr("x",function(d){
          var coords = projection([d.lat, d.lng])
          return coords[0];
        })
        .attr("y",function(d){  
          var coords = projection([d.lat, d.lng])
          return coords[1];
        })  
        .text("this is a capital")
        .text(function(d){
          d.name
        })
        .attr("dx",2)
        .attr("dy",2)

      */  
});

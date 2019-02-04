var margin = { top: 50, left: 50, right: 50, bottom: 50 },
  height = 500 - margin.top - margin.bottom,
  width = 1000 - margin.left - margin.right;

var svg = d3
  .select("#map")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .append("g");
 
d3.queue()
  .defer(d3.json,"https://unpkg.com/world-atlas@1/world/110m.json")
  .defer(d3.json,"https://raw.githubusercontent.com/joanh3aly/cloud/master/maps/globe/timestampCities.json")
  //.defer(d3.csv,"https://raw.githubusercontent.com/joanh3aly/cloud/master/maps/globe/timestampCities.csv")
  .await(ready)

function ready(error,data,capitalsData) {
  if (error) throw error;

  var countries = topojson.feature(data, data.objects.countries).features;
  //console.log(JSON.stringify(countries, null, 2));

  //var capitals = json.feature(data, capitalsData.objects.countries).features;
  //var capitals = json.feature(data, capitalsData.objects.countries).features;

  var capitals = [];

  for(var i in capitalsData) {
    capitals.push([capitalsData[i]]);
    //console.log(i);
  }
  console.log(capitals);

  //console.log(JSON.stringify(capitalsData, null, 2));

  var projection = d3.geoMercator()
    .scale(100)
    .center([83.96, 40]);

  var path = d3.geoPath()
    .projection(projection);

/*    
  var capitalsArray = []  
  for ( var i = 1; i <= capitals.length; ++i) {
     //console.log(capitals[i].lat)  
     if (capitals[i] == 1) {
    //   console.log(capitals[i].lat);
     }
     capitalsArray += capitals[i];
     
  }  
  console.log(capitalsArray[5]);
*/

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
    
    //var timer = d3.timer(callback);
    /*
      we just need to display the timestamp?
    */
    svg
      .append("g") 
      .attr("class", "city-group")
      .selectAll(".city-circle")
      .data(capitals)
      //console.log(capitals.lat)
      .enter()
      .append("circle")
      .style("fill", function(d) {            
        if (d.alert == 1) {
          return "red"
        } else { 
            return "black" 
          }          
      ;}) 
      .attr("r", function(d) {            
        if (d.alert == 1) {
          return 6
        } else { 
            return 2
          }          
      ;})  
    /*  
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)   
      */               
     // .attr("class", "city-circle")
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
        .attr("class","city-label")
        .attr("x",function(d){
          var coords = projection([d.lat, d.lng])
          return coords[0];
        })
        .attr("y",function(d){  
          var coords = projection([d.lat, d.lng])
          return coords[1];
        }) 
        .text(function(d){
          return d.city
        })
        .attr("dx",2)
        .attr("dy",2)  
    
};

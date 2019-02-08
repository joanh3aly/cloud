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
 
  /*
    Convert json data to JS array
  */
  var capitals = [];
  for(var i in capitalsData) {
    capitals.push([capitalsData[i]]);
    //console.log(i);
  }
  console.log(capitals);
  

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
    
    //var timer = d3.timer(callback);
    
    

    var interval = setInterval(function () {
      //add your new fresh data here
      update();
    }, 5000);

    function update () {
    var hourlyCapitals = [];  
    for (var j = 0; j < capitals.length; ++j) {
      for (var k = 1; k <= 24; ++k) {
        if (capitals[j][0].timestamp == k && capitals[j][0].alert == 1) {
          hourlyCapitals.push([capitals[j][0]]);
        }}}
        console.log(hourlyCapitals[0][0]);
        console.log(hourlyCapitals[1][0]);
        console.log(hourlyCapitals[2][0]);
   //     for (var l = 0; l < hourlyCapitals.length; ++l) {
        //  console.log(capitals[j][0].alert);
          svg
            .append("g") 
            .attr("class", "city-group")
            .selectAll(".city-circle")
            .data(hourlyCapitals)
            .enter()
            .append("circle")
            .style("fill", function(d) {   
             // console.log(d);         
              if (d[0].alert == 1) {
                return "red"
              } else { 
                  return "black" 
                }          
            ;}) 
            .attr("r", function(d) {            
              if (d[0].alert == 1) {
                return 6
              } else { 
                  return 2
                }          
            ;})                 
          // .attr("class", "city-circle")
            .attr("cx",10)
            .attr("cy",10)
            .attr("cx",function(d){
              var coords = projection([d[0].lat, d[0].lng])
              return coords[0];
            })
            .attr("cy",function(d){  
              var coords = projection([d[0].lat, d[0].lng])
              //console.log(d[0].lat);
              return coords[1];
            }) 

            svg.selectAll(".city-label")
              .data(capitals)
              .enter()
              .append("text")
              .attr("class","city-label")
              .attr("x",function(d){
                var coords = projection([d[0].lat, d[0].lng])
                return coords[0];
              })
              .attr("y",function(d){  
                var coords = projection([d[0].lat, d[0].lng])
                return coords[1];
              }) 
              .text(function(d){
                return d[0].city
              })
              .attr("dx",2)
              .attr("dy",2)  
      //    }
     //   }
     // }
    }

      
    
};

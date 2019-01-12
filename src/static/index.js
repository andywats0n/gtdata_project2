const center = [39.8283, -98.5795];
let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`;
let month = 1;
let year = 2010;

var precipData = [];
var snowData = [];
var mintempData = [];
var maxtempData = [];

// precipitation
let precipUrl = `http://localhost:5000/api/filterprcp/${month}/${year}`
d3.json(precipUrl, function(response) {  
  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    precipData.push(L.heatLayer([record.Lat, record.Long, record['Prcp(in)']], {
      radius: 50,
      blur: 15
    }));
  }
});

// snowfall
let snowUrl = `http://localhost:5000/api/filtersnow/${month}/${year}`
d3.json(snowUrl, function(response) {  
  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    snowData.push(L.heatLayer([record.Lat, record.Long, record['Snow(in)']], {
      radius: 50,
      blur: 15
    }));
  }
});

// low temps
let mintempUrl = `http://localhost:5000/api/filtermint/${month}/${year}`
d3.json(mintempUrl, function(response) {  
  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    mintempData.push(L.heatLayer([record.Lat, record.Long, record['Temp(F)']], {
      radius: 50,
      blur: 15
    }));
  }
});

// high temps
let maxtempUrl = `http://localhost:5000/api/filtermaxt/${month}/${year}`
d3.json(maxtempUrl, function(response) {
  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    maxtempData.push(L.heatLayer([record.Lat, record.Long, record['Temp(F)']], {
      radius: 50,
      blur: 15
    }));
  }
});


let precipLayer = L.layerGroup(precipData);
let snowLayer = L.layerGroup(snowData);
let mintempLayer = L.layerGroup(mintempData);
let maxtempLayer = L.layerGroup(maxtempData);

let overlayMaps = {
  Precipitation: precipLayer,
  Snow: snowLayer,
  MinTemperatures: mintempLayer,
  MaxTemperatures: maxtempLayer
};

let primeTile = L.tileLayer(mapUrl, { id: 'mapbox.streets' });

let baseMaps = {
  "Base Map": primeTile
}

let map = L.map('mapid', {
  center:center,
  zoom: 5.15,
  layers: [primeTile, snowLayer]
})

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);



// let myurl = 'http://localhost:5000/api/maxt';
// d3.json(myurl, function(response) {
//   var heatArray = [];
//   for (var i = 0; i < response.length; i++) {
//     var record = response[i];
//     heatArray.push([record.Lat, record.Long, record['Temp(F)']]);
//   }

// var heat = L.heatLayer(heatArray, {
//     radius: 50,
//     blur: 15
// }).addTo(mymap);
// });

// mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)});

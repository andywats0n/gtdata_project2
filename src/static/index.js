function init() {

const center = [39.8283, -98.5795];
let mymap = L.map('mapid').setView(center, 5.15);
let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`;

let precipUrl = `http://localhost:5000/api/filterprcp/${month}/${year}`
let snowUrl = `http://localhost:5000/api/filtersnow/${month}/${year}`
let mintempUrl = `http://localhost:5000/api/filtermintemp/${month}/${year}`
let maxtempUrl = `http://localhost:5000/api/filtermaxtemp/${month}/${year}`

primeTile = L.tileLayer(mapUrl, { id: 'mapbox.streets' });

L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

};

init();


d3.json(precipUrl, function(response) {

  console.log('reading');
  var precipData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    precipData.push([record.Lat, record.Long, record['Prcp(in)'] * 100]);
  };
  var precipHeat = L.heatLayer(precipData, {
      radius: 50,
      blur: 15,
      gradient: gradient: {0.3: 'blue', .5: 'lime', 1: 'red'}
  })
});


d3.json(snowUrl, function(response) {

  console.log('reading');
  var snowData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    snowData.push([record.Lat, record.Long, record['Snow(in)'] * 60]);
  };
  var snowHeat = L.heatLayer(snowData, {
      radius: 60,
      blur: 15,
      gradient: {0.3: 'blue', .7: 'lime', 1: 'red'}
  })
});


d3.json(mintempUrl, function(response) {

  console.log('reading');
  var mintempData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    mintempData.push([record.Lat, record.Long, record['Temp(F)']]);
  };
  var mintempHeat = L.heatLayer(mintempData, {
      radius: 50,
      blur: 15
  })
});


d3.json(maxtempUrl, function(response) {

  console.log('reading');
  var maxtempData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    maxtempData.push([record.Lat, record.Long, record['Temp(F)']]);
  };
  var maxtempHeat = L.heatLayer(maxtempData, {
      radius: 50,
      blur: 15,
      gradient:
  })
});


let precipLayer = L.layerGroup(precipHeat);
let snowLayer = L.layerGroup(snowHeat);
let mintempLayer = L.layerGroup(mintempHeat);
let maxtempLayer = L.layerGroup(maxtempHeat);

let baseMaps = {
  "Base Map": primeTile
};

let overlayMaps = {
  Precipitation: precipLayer,
  Snow: snowLayer,
  MinTemperatures: mintempLayer,
  MaxTemperatures: maxtempLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)});

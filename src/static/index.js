const center = [39.8283, -98.5795];
let mymap = L.map('mapid').setView(center, 5.15);
let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`;

primeTile = L.tileLayer(mapUrl, { id: 'mapbox.streets' });

let precipUrl = `http://localhost:5000/api/filterprcp/${month}/${year}`
d3.json(precipUrl, function(response) {

  console.log('reading');

  var precipData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];

        precipData.push([record.Lat, record.Long, record['Temp(F)']]);

    }});

let snowUrl = `http://localhost:5000/api/filtersnow/${month}/${year}`
d3.json(snowUrl, function(response) {

  console.log('reading');

  var snowData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];

        snowData.push([record.Lat, record.Long, record['Temp(F)']]);

    }});

let mintempUrl = `http://localhost:5000/api/filtermintemp/${month}/${year}`
d3.json(mintempUrl, function(response) {

  console.log('reading');

  var mintempData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];

        mintempData.push([record.Lat, record.Long, record['Temp(F)']]);

    }});

let maxtempUrl = `http://localhost:5000/api/filtermaxtemp/${month}/${year}`
d3.json(maxtempUrl, function(response) {

  console.log('reading');

  var maxtempData = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];

        maxtempData.push([record.Lat, record.Long, record['Temp(F)']]);

    }});

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

L.control.layers(primeTile, overlayMaps).addTo(myMap);

//   var heat = L.heatLayer(coordinates, {
//     radius: 20,
//     blur: 35
//   }).addTo(mymap);
// });

// var marker = L.marker([45.52, -122.67], {
//   draggable: true,
//   title: "My First Marker"
// }).addTo(mymap);
//
// marker.bindPopup("Hello There!");

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))

let myurl = 'http://localhost:5000/api/maxt';
d3.json(myurl, function(response) {

  console.log('reading');

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var record = response[i];

        heatArray.push([record.Lat, record.Long, record['Temp(F)']]);

    }
 // console.log(heatArray)
  var heat = L.heatLayer(heatArray, {
      radius: 50,
      blur: 15
  }).addTo(mymap);
  console.log('done');
});


mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)});

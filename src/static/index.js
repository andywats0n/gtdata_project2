
const center = [39.8283, -98.5795]

let mymap = L.map('mapid').setView(center, 5.15);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`
let url = 'http://localhost:5000/api/test'

L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)})



// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data[0]));

d3.json(url, function(data) {

  console.log(data);
  console.log(data[0].Long);
  console.log(data[0].Long[0]);

  var coordinates = [];
  var temps = [];
  var dates = [];

  for (var i = 0; i < data[0].Long.length; i++) {
    coordinates.push([data[0].Lat[i], data[0].Long[i]]);
    temps.push(data[0].Temp(F)[i]);
    dates.push(data[0].Long[i]);
  }
  console.log(coordinates);

  var heat = L.heatLayer(coordinates, {
    radius: 20,
    blur: 35
  }).addTo(mymap);
});

// lats = [];
// longs = [];
// temps = [];
// dates = [];

// fetch(url)
//   .then(res => res.json())
//   .then(data =>
//               for (var i = 0; i < data[0].Lat.length; i++) {
//                 lats.push(data[0].Lat[i]);
//                 longs.push(data[0].Long[i]);
//                 temps.push(data[0].Lat[i]);
//                 dates.push(data[0].Long[i]);
// }
// );
// console.log(lats);




var marker = L.marker([45.52, -122.67], {
  draggable: true,
  title: "My First Marker"
}).addTo(mymap);

marker.bindPopup("Hello There!");

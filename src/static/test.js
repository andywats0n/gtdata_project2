
const center = [39.8283, -98.5795]

let mymap = L.map('mapid').setView(center, 5.15);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`


L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)})

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

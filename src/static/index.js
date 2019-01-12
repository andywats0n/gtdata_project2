
const center = [39.8283, -98.5795]

let mymap = L.map('mapid').setView(center, 5.15);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`


L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)})

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))

let myurl = '/api/filtermaxt/' + '7/2018';
d3.json(myurl, function(response) {

  console.log('reading');
  
  var heatArray = [];
  var radii = [];
  for (var i = 0; i < response.length; i++) {
    var record = response[i];
  
        heatArray.push([record.Lat, record.Long, record['Temp(F)']*2]);
        //radii.push(25 + record['Snow(in)']*5)
    

    }
 // console.log(heatArray)
  var heat = L.heatLayer(heatArray, {
      radius: 25,
      blur: 5
      //gradient: {0.3: 'blue', .6: 'lime', 1: 'red'}
  }).addTo(mymap);
  console.log('done');
});
  
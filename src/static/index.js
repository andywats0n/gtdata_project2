
const center = [39.8283, -98.5795]

let mymap = L.map('mapid').setView(center, 5.15);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`
let maxtUrl = 'http://localhost:5000/api/maxt'
// let prcpUrl = 'http://localhost:5000/api/prcp'

L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)})

fetch(maxtUrl)
  .then(res => res.json())
  .then(data => {
    console.log('fetching data...')
    console.log(data)
  });


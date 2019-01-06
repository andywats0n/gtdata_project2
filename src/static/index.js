
let mymap = L.map('mapid').setView([33, -84], 13);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`

L.tileLayer(mapUrl, {
    maxZoom: 7,
    id: 'mapbox.streets',
}).addTo(mymap);

mymap.addEventListener('click', e => console.log(e))


let lat = '3.11'
let lng = ''
// let url = `http://api.aerisapi.com/version?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
let url = `https://api.aerisapi.com/lightning/closest?p=minneapolis,mn&format=json&radius=1000mi&filter=cg&limit=100&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))


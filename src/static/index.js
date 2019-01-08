
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`, {
    maxZoom: 18,
    id: 'mapbox.streets',
}).addTo(mymap);

let url = `https://api.aerisapi.com/records/within?p=47,-122,48,-123&filter=prcp&limit=2000&from=01/01/2000&to=now&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`


//let url = `https://api.aerisapi.com/records/minneapolis,mn?from=-1year&filter=prcp&limit=100&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
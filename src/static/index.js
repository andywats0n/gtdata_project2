
const center = [39.8283, -98.5795]

let mymap = L.map('mapid').setView(center, 5.15);

let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`
let url = 'http://localhost:5000/api/test'

L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(mymap);

<<<<<<< HEAD
<<<<<<< HEAD
let url = `https://api.aerisapi.com/records/within?p=47,-122,48,-123&filter=prcp&limit=2000&from=01/01/2000&to=now&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`


//let url = `https://api.aerisapi.com/records/minneapolis,mn?from=-1year&filter=prcp&limit=100&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
=======
mymap.addEventListener('click', e => console.log(e))

let url = `http://api.aerisapi.com/version?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

// fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))
>>>>>>> d2fb5503142a319c6748098507abcb19643441d0
=======
mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)})

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
>>>>>>> 251995942ca155f576f51b6d0a7f365a1d4f1e03

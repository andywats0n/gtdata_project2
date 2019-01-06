
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`, {
    maxZoom: 18,
    id: 'mapbox.streets',
}).addTo(mymap);

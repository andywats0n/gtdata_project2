let layer;
let center = [39.8283, -98.5795];
let map = L.map('mapid').setView(center, 5.15);
let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`;
L.tileLayer(mapUrl, { id: 'mapbox.streets' }).addTo(map);

let filters = ['maxt','mint','prcp','snow'];
let body = document.querySelector('body');
let fSelect = document.createElement('select');
let ySelect = document.createElement('select');
let mSelect = document.createElement('select');
let submit = document.createElement('button');
let clear = document.createElement('button');

submit.innerHTML = 'Submit';
clear.innerHTML = 'Clear';

body.appendChild(clear);
body.appendChild(submit);
body.appendChild(ySelect);
body.appendChild(mSelect);
body.appendChild(fSelect);

clear.classList.add('btn','btn-danger');
submit.classList.add('btn','btn-primary');

init(filters);
let minYear = 1950;
let maxYear = 2019;
let years = [];

for(let i = 12; i >= 1; i--) {
  let option = document.createElement('option');
  option.setAttribute('text', i);
  option.innerHTML = i;
  mSelect.appendChild(option);
}

for(let i = maxYear; i >= minYear; i--) {
  let option = document.createElement('option');
  option.setAttribute('text', i);
  option.innerHTML = i;
  ySelect.appendChild(option);
}

filters.forEach(f => {
  let option = document.createElement('option');
  option.setAttribute('text',f);
  option.innerHTML = f;
  fSelect.appendChild(option);
});

let fSelected = 'maxt';
let mSelected = '1';
let ySelected = '2019';

fSelect.addEventListener('click', e => fSelected = e.target.value);
mSelect.addEventListener('click', e => mSelected = e.target.value);
ySelect.addEventListener('click', e => ySelected = e.target.value);
submit.addEventListener('click', e => getData(fSelected,mSelected,ySelected));
clear.addEventListener('click', e => map.removeLayer(layer));

function getData(f,m,y) {
  let url = `http://localhost:5000/api/filter${f}/${parseInt(m)}/${parseInt(y)}`
  d3.json(url, function(response) {
    let data = [];

    for (let i = 0; i < response.length; i++) {
      let record = response[i];
      data.push([record.Lat, record.Long, 20]);
    }

    layer = L.heatLayer(data, {
      radius: 30,
      blur: 15,
      gradient: {0.3: 'blue', .7: 'lime', 1: 'red'}
    }).addTo(map);
  });
}

function init(filters) {
  filters.forEach(f => {
    fetch(`http://localhost:5000/api/${f}`)
      .then(res => res.json())
      .then(data => console.log(data));
  });
}

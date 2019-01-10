// Configure Aeris API keys
aeris.config.set({
  apiId: 'u7zVeduRm3JCpu6iS8PPi',
  apiSecret: 'x7RV4zQTnQxKCBpADZeYdX4AxmQ3ZM3lADGbp9ON'
});

// Create the map, where 'map-canvas' is the id of an HTML element.
var map = new aeris.maps.Map('map-canvas', {
  zoom: 4,
  center: [39.7,-93.38],
  baseLayer: new aeris.maps.layers.AerisTile({
    tileType: 'flat-dk',
    zIndex: 1
  })
});

// Create 'water-depth' layer
var waterDepth = new aeris.maps.layers.AerisTile({
  tileType: 'water-depth',
  zIndex: 3,
  map: map
});

// Create 'radar' layer
var radar = new aeris.maps.layers.AerisTile({
  tileType: 'radar',
  zIndex: 4,
  map: map
});

// Create 'admin-cities' layer
var adminCitiesDk = new aeris.maps.layers.AerisTile({
  tileType: 'admin-cities-dk',
  zIndex: 10,
  map: map
});

// Create the animation
// See https://github.com/aerisweather/aerisjs/blob/master/examples/animations/sync.html
// for a more complete usage demonstration
var animation = new aeris.maps.animations.AnimationSync([
  radar
], {
  from: Date.now() - 1000 * 60 * 60 * 2,    // 2 hours ago
  to: Date.now()
});

// Start the animation
animation.start();
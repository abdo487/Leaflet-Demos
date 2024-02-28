// Initializing the map with the coordinates of any place we want
var map = L.map("map1").setView([34.01325, -6.83255], 13);

// Adding the OpenStreetMap tiles to the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var map2 = L.map("map2").setView([34.01325, -6.83255], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map2);

var locateOptions = {
  position: 'topright', // Change the position of the control
  drawCircle: true,      // Show a circle that indicates the accuracy of the geolocation
  follow: true,          // Keep the user's location centered on the map as they move
  setView: 'untilPan',   // Set the view until the user manually pans the map
  icon: 'custom-icon',   // Use a custom icon for the locate control
  iconLoading: 'custom-icon-loading', // Use a custom loading icon
  markerClass: L.Marker, // Use a custom marker class
  circleStyle: {
    fillColor: '#ff0000', // Change the fill color of the accuracy circle
    fillOpacity: 0.1      // Change the fill opacity of the accuracy circle
  }
};
L.control.locate(locateOptions).addTo(map2);
// L.control.locate({
//   position: 'topright',
//   drawCircle: true,
//   follow: true,
//   setView: 'always'
// }).addTo(map2);


var map3 = L.map("map3").setView([34.02325, -6.83255], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map3);
// Pour avoire la route entre deux points
// points de départ
var startLat = 34.01325;
var startLng = -6.83255;
// points d'arrivée
var endLat = 34.04345;
var endLng = -6.83255;
// Ajouter la route entre les deux points
L.Routing.control({
  waypoints: [
      L.latLng(startLat, startLng),
      L.latLng(endLat, endLng)
  ],
  routeWhileDragging: false,
  show: false,
}).addTo(map3);
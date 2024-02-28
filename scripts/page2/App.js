// Initializing the map with the coordinates of any place we want
var map = L.map("map1").setView([34.01325, -6.83255], 13);

// Adding the OpenStreetMap tiles to the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

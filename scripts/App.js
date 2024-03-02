import generate_map from "./generate_map.js";

// Initializing the map with the coordinates of any place we want
var map = generate_map("map1");

// Ajouter la plugin geolocate
var map2 = generate_map("map2", [34.01325, -6.83255]);
L.control.locate().addTo(map2);

// Costumize the geolocate plugin
var map3 = generate_map("map3", [34.01325, -6.83255]); 
L.control.locate({
  position: 'topright', // la position de l'icone de geolocalisation
  drawCircle: false, // pour ne pas dessiner le cercle de la précision
  drawMarker: false, // pour ne pas dessiner le marker de la position
  showPopup: false, // pour ne pas afficher le popup
  setView: true, // pour centrer la carte sur la position
  keepCurrentZoomLevel: true, // pour garder le niveau de zoom actuel
  locateOptions: { // les options de la geolocalisation
      maxZoom: 15, // le niveau de zoom maximal
      enableHighAccuracy: true, // pour activer la haute précision
      timeout: 1000, // le temps maximal pour obtenir la position
  }
}).addTo(map3);

// pour afficher le marker de la position
map3.on('locationfound', function(e) {
  console.log(`
  ========= Location found =========
  Latitude: ${e.latitude}
  Longitude: ${e.longitude}
  ==================================
  `);
  map3.setView([e.latitude, e.longitude], 15); // centrer la carte sur la position

  // Personnaliser l'icone du marker
  let icon = L.icon({
      iconUrl: location.href+'assets/marker.png', // l'url de l'icone
      iconSize: [50, 50], // la taille de l'icone
  });
  // Ajouter le marker à la carte
  L.marker([e.latitude, e.longitude], {icon}).addTo(map3);
});
// pour afficher un message d'erreur si l'utilisateur refuse l'accès à sa position
map3.on('locationerror', function(e) {
  console.error("Location access denied.");
});

// Ajouter la plugin de routing
var map4 = generate_map("map4", [34.02745, -6.83255]);
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
}).addTo(map4);


// Personnaliser la route
var map5 = generate_map("map5", [34.02745, -6.83255]);
// Ajouter la route entre les deux points
let control = L.Routing.control({
  waypoints: [
      L.latLng(startLat, startLng),
      L.latLng(endLat, endLng)
  ],
  routeWhileDragging: false, 
  show: false,
  lineOptions: {
      styles: [
        {color: 'red', opacity: 1, weight: 10},
        {color: 'white', opacity: 1, weight: 5},
      ]
  },
}).addTo(map5);

// pour afficher la distance et la durée de la route
let popup = L.popup({
  closeButton: false,
  closeOnClick: false,
  autoClose: false,
  className: 'popup'
})

function SerializeDistance(distance) {
  if(distance > 1000) {
      return (distance / 1000).toFixed(0) + " km";
  }
  return distance.toFixed(0) + " m";
}
function SerializeDuration(duration) {
  if(duration > 3600) {
      return (duration / 3600).toFixed(0) + " h";
  }
  return (duration / 60).toFixed(0) + " min";
}
control.on('routesfound', function(e) {
  let routes = e.routes;
  for(let route of routes) {
      // add popup to the map above the middle of route
      let middle = route.coordinates[Math.floor(route.coordinates.length / 2)];
      popup.setLatLng(middle);
      popup.setContent(`
        <div class="popup-content">
          <p>Distance: ${SerializeDistance(route.summary.totalDistance)}</p>
          <p>Duration: ${SerializeDuration(route.summary.totalTime)} s</p>
        </div>
      `);
      popup.openOn(map5);
  }
});

// pour afficher un message d'erreur si la route n'est pas trouvée
control.on('routingerror', function(e) {
  console.error("Route not found.");
});


// implementer les deux plugins en meme temps
const obj = {
  device_position: {
      lat: null,
      lng: null,
  },
  destination: {
      lat: null,
      lng: null,
  }
}
let map6 = generate_map("map6", [34.02745, -6.83255]);
L.control.locate({
  position: 'topright',
  drawCircle: false,
  drawMarker: false,
  showPopup: false,
  setView: true,
  keepCurrentZoomLevel: true,
  locateOptions: {
      maxZoom: 15,
      enableHighAccuracy: true,
      timeout: 1000,
  }
}).addTo(map6);
map6.on('locationfound', function(e) {
  map6.setView([e.latitude, e.longitude], 15);

  let icon = L.icon({
      iconUrl: location.href+'assets/marker.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
  });
  L.marker([e.latitude, e.longitude], {icon}).addTo(map6);
  obj.device_position.lat = e.latitude;
  obj.device_position.lng = e.longitude;

  map6.on('click', handleMapClick);
})

// listen when the user click on the map
let routeControl = L.Routing.control({
  show: false,
  lineOptions: {
      styles: [
        {color: 'red', opacity: 1, weight: 10},
        {color: 'white', opacity: 1, weight: 5},
      ]
  },
  createMarker: function(i, wp, nWps) {
      return null
  },
})

const updateRoute = () => {
  routeControl.setWaypoints([
      L.latLng(obj.device_position.lat, obj.device_position.lng),
      L.latLng(obj.destination.lat, obj.destination.lng)
  ]);
  routeControl.addTo(map6);
}

const handleMapClick = (e) => {
  let lat = e.latlng.lat;
  let lng = e.latlng.lng;
  obj.destination.lat = lat;
  obj.destination.lng = lng;

  // remove the previous marker
  if(map6._markers) {
      map6.removeLayer(map6._markers);
  }
  // add the new marker
  let icon = L.icon({
      iconUrl: location.href+'assets/destination-marker.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]

  });
  map6._markers = L.marker([lat, lng], {icon}).addTo(map6);
  map6.setView([lat, lng], 15);

  updateRoute();
}


// pour aficher la position actual de l utilisateur directement apres l affichage de la page
let btns = document.querySelectorAll('.leaflet-bar-part.leaflet-bar-part-single');
for(let btn of btns) {
  btn.click();
}
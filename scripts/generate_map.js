function generate_map(id, cords) {
    let map = L.map(id).setView(cords ? cords : [34.01325, -6.83255], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  return map;
}

export default generate_map;
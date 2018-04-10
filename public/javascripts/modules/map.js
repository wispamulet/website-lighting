/* globals google */
const mapOptions = {
  center: { lat: 42.1, lng: -179.8 },
  zoom: 3,
  maxZoom: 3
};

function loadPlaces(map) {
  const places = [
    {
      name: 'US Warehouse',
      address: '13321 Garden Grove Blvd, #N, Garden Grove, CA 92843, USA',
      coordinates: {
        lat: 33.774866,
        lng: -117.900278
      }
    },
    {
      name: 'CN Industry',
      address: '4/F, Block D, Dejiarun industrial park, 128 indstrial zone, Tangxia, Dongguan, Guangdong Province, P.R.China',
      coordinates: {
        lat: 22.8,
        lng: 113.8
      }
    }
  ];
  const bounds = new google.maps.LatLngBounds();
  const infoWindow = new google.maps.InfoWindow();

  const markers = places.map((place) => {
    const position = place.coordinates;
    // console.log(position);
    bounds.extend(position);
    const marker = new google.maps.Marker({ map, position });
    marker.place = place;
    return marker;
  });

  markers.forEach((marker) => {
    return marker.addListener('click', function () {
      const html = `
        <div class="popup">
          <p>${this.place.name}</p>
          <p>${this.place.address}</p>
        </div>
        `;
      infoWindow.setContent(html);
      infoWindow.open(map, this);
    });
  });

  map.setCenter(bounds.getCenter());
  map.fitBounds(bounds);
}

function makeMap(mapDiv) {
  if (!mapDiv) return; // stop the function if there is no #map element
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
}

export default makeMap;

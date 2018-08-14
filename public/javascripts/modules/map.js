/* globals google */
const mapOptions = {
  center: { lat: 42.1, lng: -179.8 },
  zoom: 10,
  maxZoom: 6,
};

const place1 = [
  {
    name: 'US Warehouse',
    address: '13321 Garden Grove Blvd, #N, Garden Grove, CA 92843, USA',
    coordinates: {
      lat: 33.774866,
      lng: -117.900278,
    },
  },
];

const place2 = [
  {
    name: 'CN Industry',
    address:
      '4/F, Block D, Dejiarun industrial park, 128 indstrial zone, Tangxia, Dongguan, Guangdong Province, P.R.China',
    coordinates: {
      lat: 22.796313,
      lng: 114.1151118,
    },
  },
];

function loadPlaces(map, places) {
  // const places = [
  //   {
  //     name: 'US Warehouse',
  //     address: '13321 Garden Grove Blvd, #N, Garden Grove, CA 92843, USA',
  //     coordinates: {
  //       lat: 33.774866,
  //       lng: -117.900278
  //     }
  //   },
  //   // {
  //   //   name: 'CN Industry',
  //   //   address: '4/F, Block D, Dejiarun industrial park, 128 indstrial zone, Tangxia, Dongguan, Guangdong Province, P.R.China',
  //   //   coordinates: {
  //   //     lat: 22.8,
  //   //     lng: 113.8
  //   //   }
  //   // }
  // ];
  const bounds = new google.maps.LatLngBounds();
  const infoWindow = new google.maps.InfoWindow();

  const markers = places.map(place => {
    const position = place.coordinates;
    // console.log(position);
    bounds.extend(position);
    const marker = new google.maps.Marker({ map, position });
    marker.place = place;
    return marker;
  });

  markers.forEach(marker =>
    marker.addListener('click', function() {
      const html = `
        <div class="popup">
          <p>${this.place.name}</p>
          <p>${this.place.address}</p>
        </div>
        `;
      infoWindow.setContent(html);
      infoWindow.open(map, this);
    })
  );

  map.setCenter(bounds.getCenter());
  map.fitBounds(bounds);
}

function makeMap(mapDiv, mapDiv2) {
  if (!mapDiv || !mapDiv2) return; // stop the function if there is no #map element
  const map = new google.maps.Map(mapDiv, mapOptions);
  const map2 = new google.maps.Map(mapDiv2, mapOptions);
  loadPlaces(map, place1);
  loadPlaces(map2, place2);
}

export default makeMap;

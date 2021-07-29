import React, { Component, useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGl3YWthcnN0aGEiLCJhIjoiY2txOTB1dDV4MDJmZjJ3cXRnYjNxMDdsNiJ9.D3ERSKhFGqa8t0VtnAmc6A";

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

//   const addMarker = (ltlng) => {
//     if (marker.current) {
//       marker.current.setLngLat(ltlng);
//       return;
//     }
//     marker.current = new mapboxgl.Marker({ color: "#d02922" })
//       .setLngLat(ltlng)
//       .addTo(map.current);
//   };

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//     map.current.on("click", (e) => {
//       addMarker(e.lngLat);
//     });
//   });

//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} style={{ height: "500px" }} />
//     </div>
//   );
// };

// export default Map;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      marker: [77.216721, 28.6448],
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    let marker;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.216721, 28.6448],
      zoom: 10,
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.on("click", (e) => {
      if (marker) {
        marker.setLngLat(e.lngLat);
        return;
      }
      marker = new mapboxgl.Marker({ color: "#d02922" })
        .setLngLat(e.lngLat)
        .addTo(map);
    });

    map.on("load", () => {
      marker = new mapboxgl.Marker({ color: "#d02922" })
        .setLngLat(this.state.marker)
        .addTo(map);
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div
          ref={(el) => (this.mapContainer = el)}
          style={{ height: "500px" }}
        />
      </div>
    );
  }
}

export default Map;

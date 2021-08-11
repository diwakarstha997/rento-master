// import React, { Component, useRef, useEffect, useState } from "react";
import React, { Component } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGl3YWthcnN0aGEiLCJhIjoiY2txOTB1dDV4MDJmZjJ3cXRnYjNxMDdsNiJ9.D3ERSKhFGqa8t0VtnAmc6A";

class Map extends Component {
  state = {
    lng: 83.8532,
    lat: 28.5168,
    zoom: 5.93,
    marker: this.props.mapData ? this.props.mapData.marker : null, //[85.32951549304369, 27.727570745537577],
  };

  componentDidMount() {
    // const { lng, lat, zoom } = this.state;
    let marker;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [
        this.props.mapData ? this.props.mapData.lng : 83.8532,
        this.props.mapData ? this.props.mapData.lat : 28.5168,
      ],
      zoom: this.props.mapData ? this.props.mapData.zoom : 5.93,
      // center: [83.8532, 28.5168],
      // zoom: 5.93,
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
      if (this.props.editDisabled) return;
      if (marker) {
        marker.setLngLat(e.lngLat);
        // return;
      } else {
        marker = new mapboxgl.Marker({ color: "#d02922" })
          .setLngLat(e.lngLat)
          .addTo(map);
      }
      if (this.props.handleMapData)
        this.props.handleMapData(
          this.state.lng,
          this.state.lat,
          this.state.zoom,
          e.lngLat
        );
    });

    map.on("load", () => {
      map.resize();
      if (this.state.marker)
        marker = new mapboxgl.Marker({ color: "#d02922" })
          .setLngLat(this.state.marker)
          .addTo(map);
    });
    if (this.props.handleRenderControl) this.props.handleRenderControl();
  }

  render() {
    const { lng, lat, zoom } = this.state;
    if (this.props.renderControl) this.componentDidMount();
    return (
      <React.Fragment>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div
          ref={(el) => (this.mapContainer = el)}
          style={{ height: "500px" }}
        />
      </React.Fragment>
    );
  }
}

export default Map;

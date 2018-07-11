import React from "react";
import {GoogleApiWrapper} from "google-maps-react";
import ReactDOM from "react-dom";

class Map extends React.Component {
    load_map() {
        if ( this.props && this.props.google ) {
            let map = new this.props.google.maps.Map(
                ReactDOM.findDOMNode(this.refs.map),
                {
                    center: { lat: 37.345353, lng: -122.0465131},
                    zoom: 10,
                });
                let markers = this.props.locs.map(loc => new this.props.google.maps.Marker({
                    position: loc.coord,
                    map: map,
                    animation: this.props.google.maps.Animation.DROP,
                    title: loc.name}
                ));
                markers.forEach(marker => {
                    marker.addListener("click", () => {
                        this.props.marker_click(marker);
                    });
                });
                this.props.map_markers(map, markers, this.props.google);
        }
    }
    componentDidMount(){
        this.load_map();
    }
    render() {
        return (
            <div className="map_container">
                <div className="top_bar">
                    <div className="hamburger"
                        onClick={() => {this.props.toggle_side_bar()}}>☰</div>
                    <h1>Neighborhood Map</h1>
                </div>
                <div ref="map" className="map"></div>
            </div>
        );
    }
}

export default GoogleApiWrapper(
    { apiKey: "AIzaSyDcvTtkitnRqPDCyhTVrmyceRUHgiToN24", }
)(Map);

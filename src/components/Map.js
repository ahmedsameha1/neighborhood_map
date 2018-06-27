import React from "react";
import {GoogleApiWrapper} from "google-maps-react";
import ReactDOM from "react-dom";

class Map extends React.Component {
    load_map() {
        if ( this.props && this.props.google ) {
            new this.props.google.maps.Map(
                ReactDOM.findDOMNode(this.refs.map),
                {
                    center: { lat: 2, lng: 11},
                    zoom: 4,
                });
        }
    }
    componentDidMount(){
        this.load_map();
    }
    render() {
        return (
            <div className="map_container">
                <div className="top_bar"></div>
                <div ref="map" className="map"></div>
            </div>
        );
    }
}

export default GoogleApiWrapper(
    { apiKey: "AIzaSyDcvTtkitnRqPDCyhTVrmyceRUHgiToN24", }
)(Map);

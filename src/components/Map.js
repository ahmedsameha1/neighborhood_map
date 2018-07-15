import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import ReactDOM from "react-dom";

class Map extends React.Component {
    // Show the map and the markers
    load_map() {
        if (this.props && this.props.google) {
            let map = new this.props.google.maps.Map(
                ReactDOM.findDOMNode(this.refs.map),
                {
                    center: { lat: 37.445353, lng: -122.0465131 },
                    zoom: 11,
                });
            // Show all markers
            let markers = this.props.locs.map(loc => new this.props.google.maps.Marker({
                position: loc.coord,
                map: map,
                animation: this.props.google.maps.Animation.DROP,
                title: loc.name
            }
            ));
            // Add the click handler for each marker
            markers.forEach(marker => {
                marker.addListener("click", () => {
                    this.props.marker_click(marker);
                });
            });
            // Pass the Maps objects to the App component
            this.props.map_markers(map, markers, this.props.google);
        }
    }
    componentDidMount() {
        this.load_map();
    }
    render() {
        return (
            <div className="map_container">
                <header>
                    <div className="top_bar">
                        <div className="hamburger" role="button"
                            onClick={() => { this.props.toggle_side_bar() }}>☰</div>
                        <h1>Neighborhood Map</h1>
                    </div>
                </header>
                <div ref="map" className="map" role="application" aria-label="map"></div>
            </div>
        );
    }
}

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        }
    }
    componentDidMount(){
        setTimeout(()=> {if(this.mounted) {this.setState({time: 3})}}, 5000 );
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return (
            <div className="loading">{ this.state.time === 0? "Loading" : "A problem while loading"}</div>
        );
    }
}
export default GoogleApiWrapper(
    // To make the Maps api works
    { apiKey: "AIzaSyDcvTtkitnRqPDCyhTVrmyceRUHgiToN24",
        LoadingContainer: Loading,
    }
)(Map);

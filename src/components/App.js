import React, { Component } from 'react';
import './../App.css';
import Map from "./Map";
import Sidebar from "./Sidebar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_shown: true,
            locations: [{
                name: "Oracle Corporation",
                coord: {
                    lat: 37.5294,
                    lng: -122.265966
                },
                info: null,
                clicked: false,
            },
            {
                name: "Mozilla Foundation",
                coord: {
                    lat: 37.38792,
                    lng: -122.08284
                },
                info: null,
                clicked: false,
            },
            {
                name: "Intel",
                coord: {
                    lat: 37.387927777778,
                    lng: -121.96353888889
                },
                info: null,
                clicked: false,
            },
            {
                name: "Googleplex",
                coord: {
                    lat: 37.422,
                    lng: -122.084
                },
                info: null,
                clicked: false,
            },
            {
                name: "Cisco Systems",
                coord: {
                    lat: 37.4083562,
                    lng: -121.954088
                },
                info: null,
                clicked: false,
            },
            ],
            error: false,
        }
    }
    google = null;
    markers = null;
    map = null;
    info_window = null;
    map_loaded = false;

    // Getting these objects from the map component to handle thing in this component
    set_map_markers = (map, markers,google) => {
        this.map = map;
        this.markers = markers;
        this.google = google;
        this.info_window = new google.maps.InfoWindow();
        this.map_loaded = true;
        this.setState({error: false});
    };


    filter_markers = (filtered) => {
        // If the Google Maps Javascript API objects are present
        if ( this.map_loaded ) {
            // There is no filteration
            if ( filtered == null ){
                // Show all markers
                this.markers.forEach( marker => { marker.setVisible(true) });
            }
            // If there is a result after filteration
            else if ( filtered.length > 0 ) {
                // Hide all markers
                this.markers.forEach( marker => { marker.setVisible(false) });
                // Show the corresponding marker
                this.markers.filter( marker => marker.getTitle().toLowerCase() === filtered[0].name.toLowerCase() )[0].setVisible(true);
            // If there is no result after filteration
            } else {
                this.markers.forEach( marker => { marker.setVisible(false) });
            }
        } else {
            this.setState({error: true });
        }
    };

    // Show/Hide the side bar
    toggle_side_bar = () => {
        this.setState({
            side_bar_shown: !this.state.side_bar_shown
        });
    }
    // Marker click handler
    marker_clicked = (marker) => {
        // If the Google Maps Javascript API objects are present
        if ( this.map_loaded ) {
            const location = this.state.locations.filter(location => location.name === marker.getTitle() )[0];
            // If the marker has animation
            if ( marker.getAnimation() !== null ) {
                // Remove animation
                marker.setAnimation(null);
                // Close the info window
                this.info_window.close();
                // set the location as unclicked
                location.clicked = false;
            // If the marker has no animation
            } else {
                // Stop all the animations of other markers
                this.markers_stop_animation();
                // Give the marker a bounce animaton
                marker.setAnimation(this.google.maps.Animation.BOUNCE);
                // If the information is present
                if( location.info ) {
                    // Show the info window with the information
                    this.info_window.setContent(
                        `<h1 style="font-size: 4.5vw;">${location.info}
                        </h1><h6 style="font-size: 2vw;">Source: <a href="https://www.mediawiki.org/wiki/API:Showing_nearby_wiki_information">mediawiki</a></h6>`);
                // The app can't get the inforamtion
                } else if ( location.info === false) {
                    this.info_window.setContent("<h6>Error while getting data</h6>");
                // The app didn't get the information yet
                } else if ( location.info === null) {
                    this.info_window.setContent("<h4>Waiting for data...</h4>");
                }
                this.info_window.open(this.map, marker);
                // Hide the info window if after 1.5 second if the app didn't get the information yet
                if ( location.info === null ) {
                    setTimeout( () => {this.info_window.close() }, 1500);
                }
                // Set the location as clicked
                location.clicked = true;
            }
            this.setState({});
        } else {
            this.setState({error: true });
        }
    };
    // Helper method to stop all the marker animation and set all the locations unclicked
    markers_stop_animation = () => {
        if ( this.map_loaded ) {
            this.markers.forEach( marker => {
                marker.setAnimation(null);
            })
            this.state.locations.forEach( location => {
                location.clicked = false;
            })
        } else {
            this.setState({error: true });
        }
    };
    // location click handler of the side bar
    location_clicked = (location) => {
        if ( this.map_loaded ) {
            location.clicked = !location.clicked;
            this.setState({});
            // Run the marker click handler
            this.marker_clicked(
                this.markers.filter( marker => marker.getTitle() === location.name )[0]);
        } else {
            this.setState({error: true});
        }
    };
    create_url = (coord) => {
        // This "/w/api.php?action=query&format=json&list=geosearch&gscoord=37.5294%7C-122.265966&gslimit=1" is copied
        // from: https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&list=geosearch&gscoord=37.5294%7C-122.265966&gslimit=1
        // The origin=* parameter was added after seeing the code here: https://github.com/ahmedsameha1/neighborhoodMap/blob/master/src/Map.js line: 82
        return "https://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gscoord=" + coord.lat + "%7C" + coord.lng + "&gslimit=1&origin=*"
    };
    componentDidMount() {
        this.state.locations.forEach((location, index, array) => {
            // Get the data for each location
            fetch(this.create_url(location.coord)).then(response => {
                if ( response.ok ){
                    return response.json();
                }
                throw new Error("Error, response isn't ok");
            })
            // Get the information from the data
            .then(data => {
                location.info = data.query.geosearch[0].title
            })
            // Handle error, there is no data for this location
            .catch(error => {
                location.info = false;
            })
        })
    };
    render() {
        return (
            <div className="app_container">
            <div className="app">
            <Sidebar side_bar_shown={this.state.side_bar_shown}
            locs={this.state.locations} filter={this.filter_markers}
            location_click={this.location_clicked}/>
            <Map toggle_side_bar={this.toggle_side_bar} locs={this.state.locations}
            map_markers={this.set_map_markers} marker_click={this.marker_clicked}/>
            </div>
                {this.state.error && <div className="error" aria-label="error indicator">Error while loading</div>}
            </div>
        );
    }
}

export default App;

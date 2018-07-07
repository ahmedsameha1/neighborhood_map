import React, { Component } from 'react';
import './../App.css';
import Map from "./Map";
import Sidebar from "./Sidebar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_shown: true,
            fil_locs: this.data
        }
    }
    markers = null;
    map = null;
    set_map_markers = (map, markers) => {
        this.map = map;
        this.markers = markers
    };
    filter_markers = (filtered) => {
        if ( filtered == null ){
            this.markers.forEach( marker => { marker.setVisible(true) });
        }
        else if ( filtered.length > 0 ) {
            this.markers.forEach( marker => { marker.setVisible(false) });
            this.markers.filter( marker => marker.getTitle().toLowerCase() === filtered[0].name.toLowerCase() )[0].setVisible(true);
        } else {
            this.markers.forEach( marker => { marker.setVisible(false) });
        }
    };
    data = [{
        name: "Oracle Corporation",
        coord: {
            lat: 37.5294,
            lng: -122.265966
        }
    },
    {
        name: "Mozilla Foundation",
        coord: {
            lat: 37.38792,
            lng: -122.08284
        }
    },
    {
        name: "Intel",
        coord: {
            lat: 37.387927777778,
            lng: -121.96353888889
        }
    },
    {
        name: "Googleplex",
        coord: {
            lat: 37.422,
            lng: -122.084
        }
    },
    {
        name: "Cisco Systems",
        coord: {
            lat: 37.4083562,
            lng: -121.954088
        }
    },
    ];
    toggle_side_bar = () => {
        this.setState({
            side_bar_shown: !this.state.side_bar_shown
        });
    }

    render() {
        return (
            <div className="app">
            <Sidebar side_bar_shown={this.state.side_bar_shown}
            locs={this.state.fil_locs} filter={this.filter_markers} />
            <Map toggle_side_bar={this.toggle_side_bar} locs={this.state.fil_locs}
            map_markers={this.set_map_markers}/>
            </div>
        );
    }
}

export default App;

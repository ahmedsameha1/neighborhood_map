import React, { Component } from 'react';
import './../App.css';
import Map from "./Map";
import Sidebar from "./Sidebar";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Sidebar />
                <Map />
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import './../App.css';
import Map from "./Map";
import Sidebar from "./Sidebar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_shown: true,
        }
    }

    toggle_side_bar = () => {
        this.setState({
            side_bar_shown: !this.state.side_bar_shown
        });
    }

    render() {
        return (
            <div className="app">
                <Sidebar side_bar_shown={this.state.side_bar_shown}
                    />
                <Map toggle_side_bar={this.toggle_side_bar}/>
            </div>
        );
    }
}

export default App;

import React from "react";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_string: "",
            locs: this.props.locs,
        }
    }
    // Input change handler
    search_string_change = (event) => {
        const value = event.target.value;
        this.setState({ search_string: value});
        // Filter locations
        const filtered = this.props.locs.filter( loc => loc.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
        if ( value !== "" ) {
            // Run the filteration handler on the App component
            this.props.filter(filtered);
        } else {
            this.props.filter(null);
        }
        this.setState({ locs: filtered });
    };
    render() {
        return (
            <div className={this.props.side_bar_shown? "side_bar side_bar_shown": "side_bar side_bar_hidden"}>
                <input type="input" placeholder="filter" value={this.state.search_string}
                onChange={this.search_string_change}/>
                <div>
                {this.state.locs.map(loc => <div key={loc.name} role="button" aria-label="location"
                    onClick={() => {this.props.location_click(loc)}} className={ loc.clicked? "location clicked": "location" }>{loc.name}</div>)}
                </div>
            </div>
        );
    }
}

export default Sidebar;

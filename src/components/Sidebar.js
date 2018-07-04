import React from "react";

class Sidebar extends React.Component {
    render() {
        return (
            <div className={this.props.side_bar_shown? "side_bar side_bar_shown": "side_bar side_bar_hidden"}>
                <input type="input" placeholder="filter"/>
            </div>
        );
    }
}

export default Sidebar;

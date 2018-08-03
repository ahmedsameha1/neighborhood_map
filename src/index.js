import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const locations = [{
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
];
ReactDOM.render(<App locations={locations} />, document.getElementById('root'));
registerServiceWorker();

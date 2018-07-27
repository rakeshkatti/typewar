import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import {connectSocketServer} from "./plugins/socket";
import { Provider } from "react-redux";

connectSocketServer();
const store = configureStore();

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
